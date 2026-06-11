const labels = {
  1: "Nul",
  2: "Bof",
  3: "Moyen",
  4: "Bien",
  5: "Top",
};

const sizeClasses = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-12 w-12",
};

const RatingBadge = ({ rating, size = "md" }) => {
  if (!rating || !labels[rating]) return null;

  return (
    <img
      src={`/${rating}.webp`}
      alt={`${labels[rating]} — ${rating}/5`}
      title={`${labels[rating]} — ${rating}/5`}
      className={`${sizeClasses[size]} inline-block`}
      aria-label={`Note: ${rating} sur 5`}
    />
  );
};

export default RatingBadge;
