import { useState } from "react";
import { useIntl } from "react-intl";
import { useUser } from "../context/UserContext";
import { ReviewIcon } from "./icons/Icons";
import RatingBadge from "./RatingBadge";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const ReviewSection = ({ ratings = [], onSubmitReview, isSubmitting }) => {
  const intl = useIntl();
  const { user } = useUser();
  const [reviewText, setReviewText] = useState("");

  const reviews = ratings.filter((r) => r.review);

  const handleSubmit = () => {
    if (reviewText.trim()) {
      onSubmitReview(reviewText.trim());
      setReviewText("");
    }
  };

  return (
    <section className="rounded-xl border border-divider bg-content1 p-6">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <ReviewIcon size="32" />
        <div>
          <h2 className="text-lg font-bold text-foreground">
            {intl.formatMessage({ id: "reviews.title" })}
          </h2>
          <p className="text-sm text-foreground/50">
            {reviews.length > 0
              ? `${reviews.length} avis`
              : intl.formatMessage({ id: "reviews.empty" })}
          </p>
        </div>
      </div>

      {/* Write review */}
      {user.isLogged && (
        <div className="mb-6 rounded-lg bg-content2 p-4">
          <textarea
            placeholder={intl.formatMessage({ id: "reviews.placeholder" })}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-lg border border-divider bg-content1 p-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-fp-purple focus:outline-none"
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!reviewText.trim() || isSubmitting}
              className="cursor-pointer rounded-lg bg-fp-green px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "..." : intl.formatMessage({ id: "reviews.submit" })}
            </button>
          </div>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length > 0 && (
        <div className="flex flex-col gap-3">
          {reviews.map((review, index) => (
            <div key={index} className="flex gap-3 rounded-lg border border-divider p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-content2 text-sm font-bold text-fp-purple">
                {review.avatar ? (
                  <img src={review.avatar} alt={review.username} className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  review.username?.charAt(0)?.toUpperCase() || "?"
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {review.username || "Anonyme"}
                  </span>
                  <RatingBadge rating={review.rating} size="sm" />
                  {review.lastEditedAt && (
                    <span className="text-xs text-foreground/40">
                      {formatDistanceToNow(new Date(review.lastEditedAt), { addSuffix: true, locale: fr })}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-foreground/70">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
