import { useState, useCallback, useRef, useEffect } from "react";
import { Spinner } from "@heroui/react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import { searchOrop, getAllOrop } from "../lib/api";
import { useUser } from "../context/UserContext";
import BoardgameCard from "../components/BoardgameCard";
import { DbIcon, NotFoundIcon } from "../components/icons/Icons";
import { debounce } from "lodash-es";

const PAGE_SIZE = 24;

const SearchPage = () => {
  const intl = useIntl();
  const { user } = useUser();
  const [mode, setMode] = useState("search"); // "search" | "browse"
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [oropOnly, setOropOnly] = useState(false);
  const [fpRating, setFpRating] = useState(null);
  const [discordRating, setDiscordRating] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const observerRef = useRef(null);

  const debouncedSetSearch = useCallback(
    debounce((value) => setDebouncedSearch(value), 400),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSetSearch(value);
  };

  // Search query
  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ["search", debouncedSearch, oropOnly],
    queryFn: () => searchOrop(debouncedSearch, oropOnly),
    enabled: mode === "search" && debouncedSearch.length >= 2,
  });

  // Browse query (infinite scroll)
  const {
    data: browseData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isBrowsing,
  } = useInfiniteQuery({
    queryKey: ["browse", oropOnly, fpRating, discordRating],
    queryFn: ({ pageParam = 1 }) =>
      getAllOrop({ page: pageParam, oropOnly, limit: PAGE_SIZE, fpRating, discordRating }),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    enabled: mode === "browse",
  });

  // Infinite scroll observer for browse mode
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

  const getUserRating = (boardgame) => {
    if (!user.userId) return null;
    const rating = boardgame.discordOrop?.ratings?.find(
      (r) => r.userId === user.userId
    );
    return rating?.rating;
  };

  const allBrowseGames = browseData?.pages?.flatMap((p) => p.data) || [];
  const totalDocuments = browseData?.pages?.[0]?.totalDocuments;

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

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <div className="flex flex-col items-center gap-4 pt-4">
        <DbIcon size="56" />
        <h1 className="text-3xl font-bold text-foreground">
          {intl.formatMessage({ id: "app.subtitle" })}
        </h1>
        <p className="text-foreground/50">
          Trouvez un jeu et découvrez ce qu&apos;en pense la communauté
        </p>
      </div>

      {/* Mode tabs */}
      <div className="mx-auto flex rounded-lg border border-divider bg-content1 p-1">
        <button
          onClick={() => setMode("search")}
          className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            mode === "search"
              ? "bg-fp-purple text-white"
              : "text-foreground/60 hover:text-foreground"
          }`}
        >
          🔍 Rechercher
        </button>
        <button
          onClick={() => setMode("browse")}
          className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            mode === "browse"
              ? "bg-fp-purple text-white"
              : "text-foreground/60 hover:text-foreground"
          }`}
        >
          📚 Parcourir
        </button>
      </div>

      {/* Filter OROP only */}
      <label className="flex cursor-pointer items-center justify-center gap-2">
        <input
          type="checkbox"
          checked={oropOnly}
          onChange={() => setOropOnly(!oropOnly)}
          className="h-4 w-4 rounded accent-fp-purple"
        />
        <span className="text-sm text-foreground/50">
          Uniquement les jeux avec un OROP
        </span>
      </label>

      {/* Search mode */}
      {mode === "search" && (
        <>
          <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder={intl.formatMessage({ id: "search.placeholder" })}
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full rounded-xl border border-divider bg-content1 px-5 py-3.5 text-base text-foreground shadow-sm placeholder:text-foreground/30 focus:border-fp-purple focus:outline-none focus:ring-2 focus:ring-fp-purple/20"
              />
              {searchValue && (
                <button
                  onClick={() => { setSearchValue(""); setDebouncedSearch(""); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-foreground/40 hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {isSearching && (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          )}

          {searchResults && searchResults.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-8">
              <NotFoundIcon size="48" />
              <p className="text-foreground/50">
                {intl.formatMessage({ id: "search.noResults" })}
              </p>
            </div>
          )}

          {searchResults && searchResults.length > 0 && (
            <>
              <p className="text-center text-sm text-foreground/50">
                {intl.formatMessage({ id: "search.results" }, { count: searchResults.length })}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((boardgame) => (
                  <BoardgameCard
                    key={boardgame._id || boardgame.id}
                    boardgame={boardgame}
                    userRating={getUserRating(boardgame)}
                  />
                ))}
              </div>
            </>
          )}

          {!debouncedSearch && !searchResults && (
            <div className="flex flex-col items-center gap-2 py-8 text-foreground/30">
              <p className="text-lg">Tapez le nom d&apos;un jeu pour commencer</p>
            </div>
          )}
        </>
      )}

      {/* Browse mode */}
      {mode === "browse" && (
        <>
          {/* Rating filters */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-medium text-foreground/50">Note Yoël :</span>
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={`fp-${r}`}
                  onClick={() => setFpRating(fpRating === r ? null : r)}
                  className={`cursor-pointer rounded-full p-0.5 transition-all ${
                    fpRating === r
                      ? "ring-2 ring-fp-purple ring-offset-1 ring-offset-background"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={`/${r}.webp`} alt={`${r}/5`} className="h-8 w-8" />
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-medium text-foreground/50">Note Discord :</span>
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={`discord-${r}`}
                  onClick={() => setDiscordRating(discordRating === r ? null : r)}
                  className={`cursor-pointer rounded-full p-0.5 transition-all ${
                    discordRating === r
                      ? "ring-2 ring-fp-purple ring-offset-1 ring-offset-background"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={`/${r}.webp`} alt={`${r}/5`} className="h-8 w-8" />
                </button>
              ))}
            </div>
            {(fpRating || discordRating) && (
              <button
                onClick={() => { setFpRating(null); setDiscordRating(null); }}
                className="cursor-pointer rounded-md px-2 py-1 text-xs text-foreground/50 transition-colors hover:bg-content2 hover:text-foreground"
              >
                ✕ Réinitialiser les filtres
              </button>
            )}
          </div>
          {isBrowsing && (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          )}

          {totalDocuments && (
            <p className="text-center text-sm text-foreground/50">
              {allBrowseGames.length} / {totalDocuments} jeux
            </p>
          )}

          {allBrowseGames.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allBrowseGames.map((boardgame, index) => {
                const isLast = index === allBrowseGames.length - 1;
                return (
                  <div key={boardgame._id || boardgame.id} ref={isLast ? lastCardRef : null}>
                    <BoardgameCard
                      boardgame={boardgame}
                      userRating={getUserRating(boardgame)}
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

          {!hasNextPage && allBrowseGames.length > 0 && (
            <p className="text-center text-sm text-foreground/40">
              Tous les jeux ont été chargés
            </p>
          )}
        </>
      )}

      {/* Scroll to top */}
      {showScrollTop && mode === "browse" && (
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

export default SearchPage;
