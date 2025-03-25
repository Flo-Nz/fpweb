import {
  Card,
  CardBody,
  Input,
  Pagination,
  Spinner,
  Switch,
} from "@heroui/react";
import { DbIcon } from "../components/Icons";
import { FormattedMessage, useIntl } from "react-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllOrop, searchOrop } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import BoardgameCard from "../components/BoardgameCard";
import { debounce } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserInfos } from "../providers/UserInfosContext";

const SearchBoardgames = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTitle = queryParams.get("title") || "";
  const [inputValue, setInputValue] = useState(initialTitle);
  const [debouncedValue, setDebouncedValue] = useState(initialTitle);
  const [oropOnly, setOropOnly] = useState(false); // Default to false
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce of the search input's query
  const debouncedQuery = useMemo(
    () => debounce((value) => setDebouncedValue(value), 300),
    []
  );

  useEffect(() => {
    debouncedQuery(inputValue);
  }, [inputValue, debouncedQuery]);

  // Handle query params and page changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);

    if (debouncedValue !== initialTitle) {
      if (debouncedValue) {
        searchParams.set("title", debouncedValue);
      } else {
        searchParams.delete("title");
      }
      searchParams.set("page", page);
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  }, [
    debouncedValue,
    navigate,
    location.pathname,
    initialTitle,
    location.search,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const {
    isPending,
    isError,
    data: boardgames = [],
  } = useQuery({
    queryKey: ["searchResults", debouncedValue, oropOnly],
    queryFn: searchOrop,
    refetchOnWindowFocus: false,
    enabled: !!debouncedValue && debouncedValue.length > 2,
  });

  const {
    isPending: isAllOropPending,
    isError: isAllOropError,
    data: {
      boardgames: allBoardgames = [],
      page,
      totalDocuments,
      totalPages,
    } = {},
  } = useQuery({
    queryKey: ["allOrops", currentPage, oropOnly],
    queryFn: () => getAllOrop({ page: currentPage, oropOnly }),
    refetchOnWindowFocus: false,
  });

  return (
    <div id="searchingBoardGame">
      <Card
        isBlurred
        className="border-none max-w-[100%] mb-2 mt-6 bg-neutral-200"
        shadow="sm"
      >
        <CardBody>
          <div className="flex flex-col gap-0 text-center">
            <h1 className="font-medium text-xl font-semibold">
              <FormattedMessage id="SearchBg.Title" />
            </h1>
            <p className="gap-0 text-small italic text-center">
              <i>
                <FormattedMessage id="SearchBg.Subtitle" />
              </i>
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
              <FormattedMessage
                id="BoardgamesList.Count"
                values={{ totalDocuments }}
              />
            </p>
          </div>
          <div className="mt-8 w-full lg:w-2/5">
            <Input
              isClearable
              variant="faded"
              color="warning"
              size="lg"
              value={inputValue}
              onValueChange={setInputValue}
              radius="lg"
              label={intl.formatMessage({ id: "SearchBg.InputLabel" })}
              startContent={<DbIcon size="1.4em" />}
              autoFocus
              className="focus-input"
            />
            <Switch
              isSelected={oropOnly}
              color="danger"
              onValueChange={setOropOnly}
              size="lg"
              className="mt-2"
              classNames={{
                wrapper: oropOnly
                  ? "bg-gradient-to-r from-blue-500 to-pink-500"
                  : "bg-gray-600",
                thumb:
                  "bg-transparent bg-[url('/yoel.jpg')] bg-cover bg-center bg-no-repeat",
              }}
            >
              Uniquement OROP
            </Switch>
          </div>
          <div className="mt-8">
            <h2 className="font-semibold text-xl">
              <FormattedMessage id="Common.Results" />
            </h2>
            <h3 className="mt-1">
              {!inputValue ? (
                <FormattedMessage id="SearchBg.StartToType" />
              ) : (
                <FormattedMessage
                  id={
                    boardgames?.length === 24
                      ? "SearchBg.ResultsLimit"
                      : "SearchBg.ResultsCount"
                  }
                  values={{ resultsCount: boardgames?.length }}
                />
              )}
            </h3>
            {!inputValue && !isAllOropPending && (
              <div className="m-auto pt-8">
                <Pagination
                  siblings={3}
                  total={totalPages}
                  color="danger"
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3 lg:gap-4">
              {!inputValue && isAllOropPending && (
                <Spinner
                  color="danger"
                  label="Chargement des jeux..."
                  labelColor="danger"
                />
              )}
              {inputValue && inputValue.length >= 3 && isPending && (
                <Spinner
                  color="danger"
                  label="Chargement des jeux..."
                  labelColor="danger"
                />
              )}
              {!inputValue &&
                allBoardgames.map((bg) => (
                  <BoardgameCard key={bg.id?.toString()} boardgame={bg} />
                ))}
              {Array.isArray(boardgames) &&
                boardgames.length > 0 &&
                boardgames.map((bg) => (
                  <BoardgameCard key={bg.id?.toString()} boardgame={bg} />
                ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SearchBoardgames;
