import { Card, CardBody, Input, Pagination, Spinner } from "@heroui/react";
import { DbIcon } from "../components/Icons";
import { FormattedMessage, useIntl } from "react-intl";
import { useUserInfos } from "../App";
import { useEffect, useMemo, useState } from "react";
import { userRatings } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import BoardgameCard from "../components/BoardgameCard";
import { debounce, filter, includes, isArray } from "lodash";
import DiscordLoginButton from "../components/DiscordLoginButton";
import GoogleLoginButton from "../components/GoogleLoginButton";

const MyRatings = () => {
  const intl = useIntl();
  const { userInfos } = useUserInfos();
  const [inputValue, setInputValue] = useState("");
  const [filteredBoardgames, setFilteredBoardgames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedBoardgames, setDisplayedBoardgames] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const {
    isPending,
    isError,
    data: boardgames = [],
  } = useQuery({
    queryKey: ["myRatings", userInfos?.isLogged],
    queryFn: userRatings,
    refetchOnWindowFocus: false,
    enabled: userInfos?.isLogged,
  });

  const debouncedQuery = useMemo(
    () => debounce((value) => setDebouncedValue(value), 300),
    []
  );

  useEffect(() => {
    debouncedQuery(inputValue);
  }, [inputValue, debouncedQuery]);

  useEffect(() => {
    if (!isPending && !isError && userInfos?.isLogged) {
      if (debouncedValue) {
        updateSearchValue(debouncedValue);
      } else {
        setFilteredBoardgames(boardgames);
        setDisplayedBoardgames(
          boardgames.slice(currentPage * 12 - 12, currentPage * 12)
        );
      }
    }
  }, [debouncedValue, boardgames, isPending, isError, userInfos?.isLogged]);

  const updateBoardgames = (bgs, page) => {
    setDisplayedBoardgames(bgs?.slice(page * 12 - 12, page * 12));
    setCurrentPage(page);
  };

  const getTotalPages = (total) => Math.ceil(total / 12);

  const updateSearchValue = (value) => {
    setInputValue(value);
    const results = filter(boardgames, (boardgame) => {
      const valueRegexp = new RegExp(value, "i");
      for (const title of boardgame.title) {
        if (valueRegexp.test(title)) {
          return true;
        }
      }
    });
    setFilteredBoardgames(results);
    updateBoardgames(results, 1);
  };

  if (isPending) {
    if (userInfos?.isLogged) {
      return (
        <Card className="pt-8 pb-8">
          <CardBody>
            <Spinner color="secondary" size="lg" />
          </CardBody>
        </Card>
      );
    }
    return (
      <Card className="pb-8">
        <CardBody className="items-center">
          <h1 className="font-medium text-xl font-semibold mb-8">
            <FormattedMessage id="MyRatings.Title" />
          </h1>
          <div className="mb-8">
            <FormattedMessage id="Error.NeedLogin" />
          </div>
          <div className="flex flex-col gap-4">
            <DiscordLoginButton />
            <GoogleLoginButton />
          </div>
        </CardBody>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="pt-8 pb-8">
        <CardBody>
          <FormattedMessage id="Error.IsError" />
        </CardBody>
      </Card>
    );
  }

  return (
    <div id="intro">
      <Card
        isBlurred
        className="border-none max-w-[100%] mb-2 mt-6 bg-neutral-200"
        shadow="sm"
      >
        <CardBody>
          <div className="flex flex-col gap-0 text-center">
            <h1 className="font-medium text-xl font-semibold">
              <FormattedMessage id="MyRatings.Title" />
            </h1>
            <p className="gap-0 text-small italic text-center">
              <i>
                <FormattedMessage id="MyRatings.Subtitle" />
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
              onValueChange={setInputValue} // Directly set inputValue
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
              <FormattedMessage
                id="SearchBg.ResultsCount"
                values={{ resultsCount: filteredBoardgames?.length ?? 0 }}
              />
            </h3>
            {isPending && (
              <div className="full-w">
                <Spinner color="black" />
              </div>
            )}
            {filteredBoardgames?.length > 12 && (
              <div className="mt-4">
                <Pagination
                  total={getTotalPages(filteredBoardgames?.length ?? 0)}
                  color="danger"
                  page={currentPage}
                  onChange={(page) =>
                    updateBoardgames(filteredBoardgames, page)
                  }
                />
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3 lg:gap-4">
              {displayedBoardgames?.length > 0 &&
                displayedBoardgames.map((bg) => (
                  <BoardgameCard
                    boardgame={bg}
                    userInfos={userInfos}
                    key={bg._id?.toString()}
                  />
                ))}
            </div>
            {filteredBoardgames?.length > 12 && (
              <div className="mt-4">
                <Pagination
                  total={getTotalPages(filteredBoardgames?.length ?? 0)}
                  color="danger"
                  page={currentPage}
                  onChange={(page) =>
                    updateBoardgames(filteredBoardgames, page)
                  }
                />
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyRatings;
