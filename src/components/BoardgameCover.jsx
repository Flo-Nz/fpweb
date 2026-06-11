import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBggCover } from "../lib/api";

const BoardgameCover = ({ boardgame, size = "md" }) => {
  const [imgError, setImgError] = useState(false);
  const id = boardgame._id || boardgame.id;

  // If coverUrl is already in the boardgame data, use it directly
  const cachedUrl = boardgame.coverUrl || boardgame.thumbnailUrl;

  // Only fetch from API on the detail page (size="lg"), not in lists
  const { data } = useQuery({
    queryKey: ["cover", id],
    queryFn: () => fetchBggCover(id),
    enabled: !cachedUrl && !!id && size === "lg",
    staleTime: Infinity,
    retry: false,
  });

  const coverUrl = cachedUrl || data?.coverUrl || data?.thumbnailUrl;

  const sizeConfig = {
    sm: { container: "h-12 w-12", fit: "object-cover" },
    md: { container: "h-20 w-20", fit: "object-cover" },
    lg: { container: "max-h-48 w-auto max-w-[180px]", fit: "object-contain" },
  };

  const { container, fit } = sizeConfig[size];

  if (!coverUrl || imgError) {
    const title = boardgame.title?.[0] || "?";
    return (
      <div
        className={`${container} flex items-center justify-center rounded-lg bg-content2 text-foreground/30 font-bold uppercase shrink-0`}
      >
        {title.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={coverUrl}
      alt={boardgame.title?.[0] || "Couverture"}
      className={`${container} ${fit} rounded-lg shrink-0`}
      loading="lazy"
      onError={() => setImgError(true)}
    />
  );
};

export default BoardgameCover;
