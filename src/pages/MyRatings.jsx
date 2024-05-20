import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { SearchIcon } from "../components/Icons";
import { FormattedMessage, useIntl } from "react-intl";
import { useUserInfos } from "../App";
import { useEffect, useState } from "react";
import { userRatings } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import BoardgameCard from "../components/BoardgameCard";
import { filter, includes, isArray } from "lodash";
import DiscordLoginButton from "../components/DiscordLoginButton";

const MyRatings = () => {
  const intl = useIntl();
  const { userInfos } = useUserInfos();
  const [inputValue, setInputValue] = useState("");
  const [filteredBoardgames, setFilteredBoardgames] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedBoardgames, setDisplayedBoardgames] = useState([]);
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

  useEffect(() => {
    if (!isPending && !isError && userInfos?.isLogged) {
      if (inputValue) {
        updateSearchValue(inputValue);
      } else {
        setFilteredBoardgames(boardgames);
        setDisplayedBoardgames(
          boardgames.slice(currentPage * 12 - 12, currentPage * 12)
        );
      }
    }
  }, [boardgames]);

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
          <DiscordLoginButton />
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
          <div className="mt-8 full-w">
            <Input
              variant="flat"
              classNames={{
                input: [
                  "text-primary",
                  "text-xl",
                  "group-data-[hover=true]:text-zinc-700",
                ],
                innerWrapper: [
                  "bg-transparent",
                  "text-primary",
                  "group-data-[hover=true]:text-zinc-700",
                ],
                inputWrapper: [
                  "bg-zinc-700",
                  "text-primary",
                  "group-data-[hover=true]:bg-zinc-400",
                  "group-data-[hover=true]:text-zinc-700",
                  "group-data-[focus=true]:bg-zinc-600",
                ],
              }}
              startContent={<SearchIcon />}
              label={intl.formatMessage({ id: "Common.Title" })}
              value={inputValue}
              onValueChange={(value) => updateSearchValue(value)}
              isClearable
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
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyRatings;
