import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import { Spinner } from "@heroui/react";
import { getBoardgame, postRating } from "../lib/api";
import { useUser } from "../context/UserContext";
import { canEdit } from "../lib/auth";
import RatingBadge from "../components/RatingBadge";
import RatingSelector from "../components/RatingSelector";
import ReviewSection from "../components/ReviewSection";
import ScribePanel from "../components/ScribePanel";
import BoardgameCover from "../components/BoardgameCover";
import { BackIcon, SearchYoutubeIcon, UsersIcon, NotFoundIcon, CartIcon } from "../components/icons/Icons";

const BoardgamePage = () => {
  const { id } = useParams();
  const intl = useIntl();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  const goBack = () => navigate(-1);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const parsed = new URL(url);
      const videoId = parsed.searchParams.get("v");
      const timestamp = parsed.searchParams.get("t");
      if (!videoId) return null;
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      if (timestamp) {
        const seconds = timestamp.replace("s", "");
        embedUrl += `?start=${seconds}`;
      }
      return embedUrl;
    } catch {
      return null;
    }
  };

  const { data: boardgame, isLoading } = useQuery({
    queryKey: ["boardgame", id],
    queryFn: () => getBoardgame(id),
  });

  const rateMutation = useMutation({
    mutationFn: ({ rating, review }) =>
      postRating(boardgame.title[0], rating, review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boardgame", id] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!boardgame) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <NotFoundIcon size="64" />
        <p className="text-lg text-foreground/50">Jeu introuvable</p>
        <button onClick={goBack} className="flex cursor-pointer items-center gap-2 rounded-lg bg-content2 px-4 py-2 text-sm font-medium text-foreground">
          <BackIcon size="18" /> Retour
        </button>
      </div>
    );
  }

  const title = boardgame.title?.[0] || "Sans titre";
  const fpRating = boardgame.fpOrop?.rating;
  const fpReview = boardgame.fpOrop?.review;
  const youtubeUrl = boardgame.fpOrop?.youtubeUrl;
  const discordRating = boardgame.discordRating;
  const ratings = boardgame.discordOrop?.ratings || [];
  const ratingsCount = ratings.length;
  const searchCount = boardgame.searchCount || 0;
  const userRating = ratings.find((r) => r.userId === user.userId);

  return (
    <div className="flex flex-col gap-6">
      <button onClick={goBack} className="flex w-fit cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-foreground/50 hover:bg-content2 hover:text-foreground">
        <BackIcon size="18" /> Retour
      </button>

      {/* Main card */}
      <div className="rounded-xl border border-divider bg-content1 p-6">
        <div className="flex gap-4">
          {/* Cover */}
          <BoardgameCover boardgame={boardgame} size="lg" />

          {/* Title + Ludum link */}
          <div className="flex flex-1 flex-col gap-2">
            <h1 className="text-2xl font-bold capitalize text-foreground">{title}</h1>
            <a
              href={`https://www.ludum.fr/rechercher?s=${encodeURI(title)}&aff=84`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-1.5 rounded-lg bg-content2 px-3 py-1.5 text-xs font-medium text-foreground/70 no-underline transition-colors hover:bg-fp-green/15 hover:text-fp-green"
            >
              <CartIcon size="18" />
              Acheter sur Ludum
            </a>
          </div>
        </div>

        {/* Ratings grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {fpRating && (
            <div className="flex flex-col items-center gap-2 rounded-xl bg-content2 p-4">
              <span className="text-xs font-medium uppercase text-foreground/50">
                {intl.formatMessage({ id: "rating.fp" })}
              </span>
              <RatingBadge rating={fpRating} size="lg" />
              {fpReview && <p className="text-center text-xs italic text-foreground/50">&quot;{fpReview}&quot;</p>}
            </div>
          )}
          {discordRating && (
            <div className="flex flex-col items-center gap-2 rounded-xl bg-content2 p-4">
              <span className="text-xs font-medium uppercase text-foreground/50">
                {intl.formatMessage({ id: "rating.discord" })}
              </span>
              <RatingBadge rating={discordRating} size="lg" />
              <span className="text-xs text-foreground/50">
                {intl.formatMessage({ id: "rating.count" }, { count: ratingsCount })}
              </span>
            </div>
          )}
          <div className="flex flex-col items-center gap-2 rounded-xl bg-content2 p-4">
            <span className="text-xs font-medium uppercase text-foreground/50">Popularité</span>
            <div className="flex items-center gap-2">
              <UsersIcon size="24" />
              <span className="text-2xl font-bold text-foreground">{searchCount}</span>
            </div>
            <span className="text-xs text-foreground/50">
              {intl.formatMessage({ id: "rating.searches" }, { count: searchCount })}
            </span>
          </div>
        </div>

        {/* YouTube OROP — between stats and user rating */}
        {youtubeUrl && (
          <div className="mt-6">
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-fp-rose/10 px-4 py-3 text-sm font-medium text-fp-rose transition-colors hover:bg-fp-rose/20"
            >
              <SearchYoutubeIcon size="24" />
              {showVideo ? "Masquer la vidéo" : "Regarder l'épisode OROP"}
            </button>
            {showVideo && getEmbedUrl(youtubeUrl) && (
              <div className="mt-3 overflow-hidden rounded-xl">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={getEmbedUrl(youtubeUrl)}
                    title={`OROP — ${title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full rounded-xl"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* User rating */}
        <div className="mt-6 border-t border-divider pt-6">
          {user.isLogged ? (
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm font-medium text-foreground">
                {userRating ? intl.formatMessage({ id: "rating.update" }) : intl.formatMessage({ id: "rating.rate" })}
              </span>
              <RatingSelector
                currentRating={userRating?.rating}
                onRate={(rating) => rateMutation.mutate({ rating })}
                isLoading={rateMutation.isPending}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-xl bg-content2 p-4">
              <p className="text-sm text-foreground/60">
                Connectez-vous pour noter ce jeu et partager votre avis
              </p>
              <a href={process.env.DISCORD_OAUTH_URL} className="rounded-lg bg-fp-purple px-4 py-2 text-sm font-medium text-white no-underline hover:opacity-90">
                {intl.formatMessage({ id: "nav.login" })}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Scribe panel — visible only for authorized editors */}
      {user.isLogged && canEdit(user.discordRoles) && (
        <ScribePanel boardgame={boardgame} />
      )}

      <ReviewSection
        ratings={ratings}
        onSubmitReview={(review) => rateMutation.mutate({ rating: userRating?.rating || 3, review })}
        isSubmitting={rateMutation.isPending}
      />
    </div>
  );
};

export default BoardgamePage;
