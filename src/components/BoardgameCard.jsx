import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import RatingBadge from "./RatingBadge";
import BoardgameCover from "./BoardgameCover";
import { SearchYoutubeIcon } from "./icons/Icons";

const BoardgameCard = ({ boardgame, userRating }) => {
  const intl = useIntl();
  const title = boardgame.title?.[0] || "Sans titre";
  const fpRating = boardgame.fpOrop?.rating;
  const discordRating = boardgame.discordRating;
  const ratingsCount = boardgame.discordOrop?.ratings?.length || 0;
  const hasYoutubeUrl = !!boardgame.fpOrop?.youtubeUrl;

  return (
    <Link
      to={`/boardgame/${boardgame._id || boardgame.id}`}
      className="group no-underline"
    >
      <div className="flex h-full gap-3 rounded-xl border border-divider bg-content1 p-3 transition-all group-hover:-translate-y-0.5 group-hover:shadow-lg">
        {/* Cover */}
        <BoardgameCover boardgame={boardgame} size="sm" />

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold capitalize leading-tight text-foreground">
              {title}
            </h3>
            {hasYoutubeUrl && (
              <div className="shrink-0" title="OROP disponible">
                <SearchYoutubeIcon size="20" />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {fpRating && (
              <div className="flex items-center gap-1">
                <RatingBadge rating={fpRating} size="sm" />
                <span className="text-xs text-foreground/50">
                  {intl.formatMessage({ id: "rating.fp" })}
                </span>
              </div>
            )}
            {discordRating && (
              <div className="flex items-center gap-1">
                <RatingBadge rating={discordRating} size="sm" />
                <span className="text-xs text-foreground/50">
                  {intl.formatMessage({ id: "rating.count" }, { count: ratingsCount })}
                </span>
              </div>
            )}
          </div>

          {userRating && (
            <div className="mt-auto flex items-center gap-1.5 border-t border-divider pt-2">
              <RatingBadge rating={userRating} size="sm" />
              <span className="text-xs font-medium text-fp-green">
                {intl.formatMessage({ id: "rating.myRating" })}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BoardgameCard;
