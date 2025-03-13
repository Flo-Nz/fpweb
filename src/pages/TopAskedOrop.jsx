import {
  Card,
  CardBody,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { FormattedMessage, useIntl } from "react-intl";
import { useUserInfos } from "../App";
import { getTopAskedOrop } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

import AskForOropButton from "../components/AskForOropButton";
import { capitalize } from "lodash";
import useScreenMobile from "../hooks/useScreenMobile";

const TopAskedOrop = () => {
  const { userInfos } = useUserInfos();
  const isMobile = useScreenMobile();

  const {
    isPending,
    isError,
    data: boardgames = [],
  } = useQuery({
    queryKey: ["topAskedOrop"],
    queryFn: getTopAskedOrop,
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return (
      <Card className="pt-8 pb-8">
        <CardBody>
          <Spinner color="secondary" size="lg" />
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
    <div id="topAskedOrop">
      <Card
        isBlurred
        className="border-none max-w-[100%] mb-2 mt-6 bg-neutral-200"
        shadow="sm"
      >
        <CardBody>
          <div className="flex flex-col gap-0 text-center">
            <h1 className="font-medium text-xl font-semibold">
              <FormattedMessage id="Nav.Top.Asked" />
            </h1>
            <p className="gap-0 text-small italic text-center">
              <i>
                <FormattedMessage id="TopAskedOrop.Subtitle" />
              </i>
            </p>
          </div>
          <div className="mt-8 lg:w-[50%] w-full m-auto">
            <Table
              aria-label="Top asked OROP table"
              classNames={{
                wrapper: ["bg-zinc-700"],
                tbody: ["text-primary"],
                th: ["bg-zinc-500", "text-primary"],
              }}
            >
              <TableHeader>
                <TableColumn>
                  <FormattedMessage id="Common.Title" />
                </TableColumn>
                <TableColumn className="text-center">
                  <FormattedMessage
                    id={isMobile ? "#" : "TopAskedOrop.Count"}
                  />
                </TableColumn>
                <TableColumn className="text-center">
                  <FormattedMessage id="Common.AskStatus" />
                </TableColumn>
              </TableHeader>
              <TableBody>
                {boardgames.map((boardgame) => (
                  <TableRow key={boardgame.title[0]}>
                    <TableCell className="font-semibold">
                      {capitalize(boardgame.title[0])}
                    </TableCell>
                    <TableCell className="text-center">
                      {boardgame.askedByCount}
                    </TableCell>
                    <TableCell className="text-center">
                      <AskForOropButton
                        boardgame={boardgame}
                        userInfos={userInfos}
                        classNames={{
                          popover: "text-secondary",
                          button: "text-primary",
                        }}
                        buttonVariant={"flat"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TopAskedOrop;
