const ratingOptions = [
  { value: 1, label: "Nul" },
  { value: 2, label: "Bof" },
  { value: 3, label: "Moyen" },
  { value: 4, label: "Bien" },
  { value: 5, label: "Top" },
];

const RatingSelector = ({ currentRating, onRate, isLoading }) => {
  return (
    <div className="flex items-center gap-3">
      {ratingOptions.map(({ value, label }) => (
        <button
          key={value}
          disabled={isLoading}
          onClick={() => onRate(value)}
          aria-label={`${label} — ${value}/5`}
          className={`cursor-pointer rounded-full p-1 transition-all disabled:opacity-50 ${
            currentRating === value
              ? "scale-110 ring-2 ring-fp-purple ring-offset-2 ring-offset-background opacity-100"
              : "opacity-60 hover:opacity-100 hover:scale-110"
          }`}
        >
          <img
            src={`/${value}.webp`}
            alt={`${label} — ${value}/5`}
            className="h-10 w-10"
          />
        </button>
      ))}
    </div>
  );
};

export default RatingSelector;
