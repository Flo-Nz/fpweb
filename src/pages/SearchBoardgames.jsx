import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@nextui-org/react";
import { SearchIcon } from "../components/Icons";
import { FormattedMessage, useIntl } from "react-intl";
import parse from "html-react-parser";
import { useUserInfos } from "../App";
import { useDeferredValue, useEffect, useState } from "react";
import { searchOrop } from "../lib/api";
import { upperCase } from "lodash";
import { useQuery } from "@tanstack/react-query";
import BoardgameCard from "../components/BoardgameCard";

const SearchBoardgames = () => {
  const intl = useIntl();
  const { userInfos } = useUserInfos();
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

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

  console.log("is pending : ", isPending);
  console.log("is error : ", isError);

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
            <h1>Results</h1>
            {isPending && (
              <div className="full-w">
                <Spinner color="black" />
              </div>
            )}
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-2">
              {boardgames.length > 0 &&
                boardgames.map((bg) => <BoardgameCard boardgame={bg} />)}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SearchBoardgames;
