import { Card, CardBody, Input, Spinner } from "@heroui/react";
import { DbIcon } from "../components/Icons";
import { FormattedMessage, useIntl } from "react-intl";
import { useUserInfos } from "../App";
import { useEffect, useMemo, useState } from "react";
import { searchOrop } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import BoardgameCard from "../components/BoardgameCard";
import { debounce } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBoardgames = () => {
  const intl = useIntl();
  const { userInfos } = useUserInfos();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTitle = queryParams.get("title") || "";
  const [inputValue, setInputValue] = useState(initialTitle);
  const [debouncedValue, setDebouncedValue] = useState(initialTitle);

  const debouncedQuery = useMemo(
    () => debounce((value) => setDebouncedValue(value), 300),
    []
  );

  useEffect(() => {
    debouncedQuery(inputValue);
  }, [inputValue, debouncedQuery]);

  useEffect(() => {
    if (debouncedValue !== initialTitle) {
      if (debouncedValue) {
        navigate(`?title=${debouncedValue}`, { replace: true });
      } else {
        navigate(location.pathname, { replace: true });
      }
    }
  }, [debouncedValue, navigate, location.pathname, initialTitle]);

  const {
    isLoading,
    isError,
    data: boardgames = [],
  } = useQuery({
    queryKey: ["searchResults", debouncedValue],
    queryFn: searchOrop,
    refetchOnWindowFocus: false,
    enabled: !!debouncedValue && debouncedValue.length > 2,
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
            {isLoading && (
              <div className="full-w">
                <Spinner color="black" />
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3 lg:gap-4">
              {Array.isArray(boardgames) &&
                boardgames.length > 0 &&
                boardgames.map((bg) => (
                  <BoardgameCard
                    key={bg._id?.toString()}
                    boardgame={bg}
                    userInfos={userInfos}
                  />
                ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SearchBoardgames;
