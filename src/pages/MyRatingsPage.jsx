import { useRef, useState, useEffect, useCallback } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import { Spinner } from "@heroui/react";
import { Link, Navigate } from "react-router-dom";
import { getUserRatings, postRating } from "../lib/api";
import { useUser } from "../context/UserContext";
import { MyRatingsIcon, SearchIcon, SearchYoutubeIcon } from "../components/icons/Icons";
import RatingBadge from "../components/RatingBadge";
import RatingSelector from "../components/RatingSelector";
import BoardgameCover from "../components/BoardgameCover";

const PAGE_SIZE = 12;

const MyRatingCard = ({ boardgame, userId, onRatingChange }) => {
  const intl = useIntl();
  const [showRatingSelector, setShowRatingSelector] = useState(false);
  const title = boardgame.title?.[0] || "Sans titre";
  const hasYoutubeUrl = !!boardgame.fpOrop?.youtubeUrl;
  const userRating = boardgame.discordOrop?.ratings?.find(
    (r) => r.userId === userId
  );

  return (
    <div className="flex gap-3 rounded-xl border border-divider bg-content1 p-3 transition-all">
      {/* Cover */}
      <BoardgameCover boardgame={boardgame} size="sm" />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/boardgame/${boardgame._id || boardgame.id}`}
            className="text-sm font-semibold capitalize leading-tight text-foreground no-underline hover:text-fp-purple"
          >
            {title}
          </Link>
          {hasYoutubeUrl && (
            <div className="shrink-0" title="OROP disponible">
              <SearchYoutubeIcon size="20" />
            </div>
          )}
        </div>

      {/* Current rating + change button */}
      <div className="flex items-center gap-2">
        {userRating && <RatingBadge rating={userRating.rating} size="sm" />}
        <button
          onClick={() => setShowRatingSelector(!showRatingSelector)}
          className="cursor-pointer rounded-md px-2 py-1 text-xs text-foreground/50 transition-colors hover:bg-content2 hover:text-foreground"
        >
          {showRatingSelector ? "Annuler" : intl.formatMessage({ id: "rating.update" })}
        </button>
      </div>

      {/* Inline rating selector */}
      {showRatingSelector && (
        <div className="flex items-center gap-2 rounded-lg bg-content2 p-2">
          <RatingSelector
            currentRating={userRating?.rating}
            onRate={(rating) => {
              onRatingChange(title, rating);
              setShowRatingSelector(false);
            }}
            isLoading={false}
          />
        </div>
      )}
      </div>
    </div>
  );
};

const MyRatingsPage = () => {
  const intl = useIntl();
  const { user, loading } = useUser();
  const queryClient = useQueryClient();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const observerRef = useRef(null);

  // Infinite query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["myRatings", user.userId],
    queryFn: ({ pageParam = 0 }) => getUserRatings({ skip: pageParam, limit: PAGE_SIZE }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.flat().length;
    },
    enabled: !!user.isLogged,
  });

  // Mutation for inline rating change
  const rateMutation = useMutation({
    mutationFn: ({ title, rating }) => postRating(title, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
    },
  });

  // Infinite scroll observer
  const lastCardRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user.isLogged) {
    return <Navigate to="/" replace />;
  }

  const allGames = data?.pages?.flat() || [];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <MyRatingsIcon size="40" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {intl.formatMessage({ id: "myRatings.title" })}
          </h1>
          {allGames.length > 0 && (
            <p className="text-sm text-foreground/50">
              {allGames.length} jeux chargés
            </p>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {!isLoading && allGames.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-divider bg-content1 py-12">
          <MyRatingsIcon size="64" />
          <p className="text-foreground/50">
            {intl.formatMessage({ id: "myRatings.empty" })}
          </p>
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg bg-fp-green px-4 py-2 text-sm font-medium text-white no-underline hover:opacity-90"
          >
            <SearchIcon size="18" />
            Chercher un jeu à noter
          </Link>
        </div>
      )}

      {allGames.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allGames.map((boardgame, index) => {
            const isLast = index === allGames.length - 1;
            return (
              <div key={boardgame._id || boardgame.id} ref={isLast ? lastCardRef : null}>
                <MyRatingCard
                  boardgame={boardgame}
                  userId={user.userId}
                  onRatingChange={(title, rating) =>
                    rateMutation.mutate({ title, rating })
                  }
                />
              </div>
            );
          })}
        </div>
      )}

      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Spinner size="md" />
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-fp-purple text-white shadow-lg transition-all hover:scale-110 hover:opacity-90"
          aria-label="Remonter en haut"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default MyRatingsPage;
