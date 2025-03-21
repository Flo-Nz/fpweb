import {
  Button,
  Card,
  CardBody,
  Link,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { FormattedMessage } from "react-intl";
import { getAllOrop } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { capitalize, toUpper } from "lodash";
import { useEffect, useState, useCallback, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NotFoundIcon, YoutubeIcon } from "../components/Icons";
import EditTableCell from "../components/EditTableCell";
import DeleteTableCell from "../components/DeleteTableCell";
import { differenceInDays } from "date-fns";
import ScrapYoutubeButton from "../components/ScrapYoutubeButton";

const BoardgamesList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [location]);

  const {
    isPending,
    isError,
    data: { boardgames = [], page, totalDocuments, totalPages } = {},
  } = useQuery({
    queryKey: ["allOrops", currentPage],
    queryFn: () => getAllOrop({ page: currentPage }),
    refetchOnWindowFocus: false,
  });

  const updatePage = useCallback(
    (page) => {
      setCurrentPage(page);
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", page);
      navigate({ search: searchParams.toString() });
    },
    [navigate, location.search]
  );

  if (isPending) {
    return (
      <div id="boardgames-list">
        <Card
          isBlurred
          className="border-none max-w-[100%] mb-2 mt-6 bg-neutral-200"
          shadow="sm"
        >
          <CardBody>
            <div className="flex flex-col gap-0 text-center">
              <h1 className="font-medium text-xl font-semibold">
                <FormattedMessage id="BoardgamesList.Title" />
              </h1>
              <p className="gap-0 text-small italic text-center">
                <i>
                  <FormattedMessage id="BoardgamesList.Subtitle" />
                </i>
              </p>
            </div>
            <div className="pt-16 pb-16 m-auto">
              <Spinner color="secondary" size="lg" />
            </div>
          </CardBody>
        </Card>
      </div>
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
    <div id="boardgames-list">
      <Card
        isBlurred
        className="border-none max-w-[100%] mb-2 mt-6 bg-neutral-200"
        shadow="sm"
      >
        <CardBody>
          <div className="flex flex-col gap-0 text-center">
            <h1 className="font-medium text-xl font-semibold">
              <FormattedMessage id="BoardgamesList.Title" />
            </h1>
            <p className="gap-0 text-small italic text-center">
              <i>
                <FormattedMessage id="BoardgamesList.Subtitle" />
              </i>
            </p>
            <p className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
              <FormattedMessage
                id="BoardgamesList.Count"
                values={{ totalDocuments }}
              />
            </p>
          </div>
          {boardgames.length > 0 ? (
            <>
              <div className="m-auto pt-8">
                <Pagination
                  siblings={3}
                  total={totalPages}
                  color="danger"
                  page={currentPage}
                  onChange={(page) => updatePage(page)}
                />
              </div>
              <div className="mt-8 lg:w-[80%] w-full m-auto">
                <Table
                  aria-label={`All boardgames page #${currentPage}`}
                  isHeaderSticky
                  classNames={{
                    wrapper: ["bg-zinc-700"],
                    tbody: ["text-primary"],
                    th: ["bg-zinc-500", "text-primary"],
                  }}
                >
                  <TableHeader>
                    <TableColumn>
                      <FormattedMessage id="BoardgamesList.Column.Title" />
                    </TableColumn>
                    <TableColumn className="text-center">
                      <FormattedMessage id="Boardgame.AlternateTitles" />
                    </TableColumn>
                    <TableColumn className="text-center">OROP</TableColumn>
                    <TableColumn className="text-center">
                      <FormattedMessage id="BgCard.Edit" />
                    </TableColumn>
                    <TableColumn className="text-center">
                      <FormattedMessage id="Common.Delete" />
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {boardgames.map((boardgame) => (
                      <TableRow key={boardgame.title[0]}>
                        <TableCell className="font-semibold">
                          {toUpper(boardgame.title[0])}
                        </TableCell>
                        <TableCell className="text-center">
                          {boardgame.title.length > 1 &&
                            boardgame.title
                              .slice(1)
                              .map((alternateTitle, index) => (
                                <span key={alternateTitle + index}>
                                  {capitalize(alternateTitle)}
                                  {index === boardgame.title.slice(1).length - 1
                                    ? ""
                                    : ", "}
                                </span>
                              ))}
                        </TableCell>
                        <TableCell className="text-center">
                          {boardgame.fpOrop?.youtubeUrl && (
                            <Link
                              isExternal
                              href={`${boardgame.fpOrop?.youtubeUrl}`}
                            >
                              <YoutubeIcon size="2em" />
                            </Link>
                          )}
                          {!boardgame.fpOrop?.youtubeUrl &&
                            (!boardgame.lastYoutubeScrapping ||
                              differenceInDays(
                                new Date(),
                                boardgame.lastYoutubeScrapping
                              ) > 10) && (
                              <ScrapYoutubeButton boardgame={boardgame} />
                            )}
                          {!boardgame.fpOrop?.youtubeUrl &&
                            differenceInDays(
                              new Date(),
                              boardgame.lastYoutubeScrapping
                            ) < 10 && (
                              <div className="justify-items-center">
                                <NotFoundIcon size="2em" />
                              </div>
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                          <EditTableCell boardgame={boardgame} />
                        </TableCell>
                        <TableCell>
                          <DeleteTableCell boardgame={boardgame} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="m-auto pt-8 pb-8">
                <Pagination
                  siblings={3}
                  total={totalPages}
                  color="danger"
                  page={currentPage}
                  onChange={(page) => updatePage(page)}
                />
              </div>
            </>
          ) : (
            <div className="pt-8 pb-8 m-auto text-xl text-red-600">
              <FormattedMessage id="BoardgamesList.Empty" />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default memo(BoardgamesList);
