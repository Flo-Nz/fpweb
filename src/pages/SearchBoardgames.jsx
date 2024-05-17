import { Card, CardBody, Input, Spinner } from "@nextui-org/react";
import { SearchIcon } from "../components/Icons";
import { FormattedMessage, useIntl } from "react-intl";
import { useUserInfos } from "../App";
import { useState } from "react";
import { searchOrop } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import BoardgameCard from "../components/BoardgameCard";

const SearchBoardgames = () => {
  const intl = useIntl();
  const { userInfos } = useUserInfos();
  const [inputValue, setInputValue] = useState("");
  const [activePage, setActivePage] = useState(1);

  const {
    isPending,
    isError,
    data: boardgames = [],
  } = useQuery({
    queryKey: ["searchResults", inputValue],
    queryFn: searchOrop,
    refetchOnWindowFocus: false,
    enabled: !!inputValue,
  });

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
              <FormattedMessage id="SearchBg.Title" />
            </h1>
            <p className="gap-0 text-small italic text-center">
              <i>
                <FormattedMessage id="SearchBg.Subtitle" />
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
              onValueChange={setInputValue}
            />
          </div>
          <div className="mt-8">
            <h2 className="font-semibold text-xl">
              <FormattedMessage id="Common.Results" />
            </h2>
            <h3 className="mt-1">
              <FormattedMessage
                id={
                  boardgames?.length === 24
                    ? "SearchBg.ResultsLimit"
                    : "SearchBg.ResultsCount"
                }
                values={{ resultsCount: boardgames?.length }}
              />
            </h3>
            {isPending && (
              <div className="full-w">
                <Spinner color="black" />
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3 lg:gap-4">
              {boardgames.length > 0 &&
                boardgames.map((bg) => (
                  <BoardgameCard boardgame={bg} userInfos={userInfos} />
                ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SearchBoardgames;
