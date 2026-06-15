import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLatestReviews } from "../lib/api";
import { ReviewIcon } from "./icons/Icons";
import RatingBadge from "./RatingBadge";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const LatestReviews = () => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: getLatestReviews,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  if (isLoading || !reviews?.length) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <ReviewIcon size="24" />
        <h2 className="text-base font-semibold text-foreground">
          Derniers avis de la communauté
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <Link
            key={i}
            to={`/boardgame/${review._id}`}
            className="group flex gap-3 rounded-xl border border-divider bg-content1 p-3 no-underline transition-all hover:shadow-md"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-content2 text-xs font-bold text-foreground/50">
              {review.avatar ? (
                <img
                  src={review.avatar}
                  alt={review.username}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                review.username?.charAt(0)?.toUpperCase() || "?"
              )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-1 overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-foreground">
                  {review.username || "Anonyme"}
                </span>
                <RatingBadge rating={review.rating} size="sm" />
              </div>
              <span className="text-xs font-medium capitalize text-fp-purple group-hover:underline">
                {review.title?.[0]}
              </span>
              <p className="line-clamp-2 text-xs text-foreground/60">
                {review.review}
              </p>
              {review.lastEditedAt && (
                <span className="text-[10px] text-foreground/30">
                  {formatDistanceToNow(new Date(review.lastEditedAt), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestReviews;
