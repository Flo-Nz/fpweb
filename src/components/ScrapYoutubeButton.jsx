import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@heroui/react";
import { includes } from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getYoutubeOrop, postAskForOrop } from "../lib/api";
import { useState } from "react";
import { differenceInDays } from "date-fns";
import { SearchYoutubeIcon } from "./Icons";
import AskForOropButton from "./AskForOropButton";
import { useUserInfos } from "../providers/UserInfosContext";

const ScrapYoutubeButton = ({ boardgame, addAskForOropButton = false }) => {
  const userInfos = useUserInfos();
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const scrapYoutube = useMutation({
    mutationFn: ({ id }) => getYoutubeOrop(id),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
      queryClient.invalidateQueries({ queryKey: ["allOrops"] });
    },
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
      queryClient.invalidateQueries({ queryKey: ["allOrops"] });
    },
  });

  const { isPending } = scrapYoutube;

  if (!userInfos?.isLogged) {
    return (
      <Popover placement="top" showArrow={true}>
        <PopoverTrigger>
          <Button variant="light" size="sm" color="danger">
            <SearchYoutubeIcon size="1.5em" />
            <FormattedMessage id="Orop.Youtube.Scrap" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <FormattedMessage id="Error.NeedLogin.YoutubeScrapping" />
        </PopoverContent>
      </Popover>
    );
  }

  const daysFromLastScrap = boardgame?.lastYoutubeScrapping
    ? differenceInDays(new Date(), boardgame.lastYoutubeScrapping)
    : undefined;

  if (daysFromLastScrap < 10) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row text-sm gap-2 text-red-400">
          <SearchYoutubeIcon size="1.5em" />
          <FormattedMessage
            id="Orop.Youtube.Nothing"
            values={{ days: daysFromLastScrap }}
          />
        </div>
        {addAskForOropButton && (
          <AskForOropButton
            classNames={{ button: "mt-2" }}
            boardgame={boardgame}
          />
        )}
      </div>
    );
  }

  if (isPending) {
    return (
      <Spinner
        color="danger"
        label="Analyse de Youtube..."
        labelColor="danger"
      />
    );
  }

  return (
    <div className="flex flex-col">
      <Button
        size="sm"
        color="danger"
        onPress={() => scrapYoutube.mutate({ id: boardgame.id })}
      >
        <SearchYoutubeIcon size="1.5em" />
        <FormattedMessage id="Orop.Youtube.Scrap" />
      </Button>
    </div>
  );
};

export default ScrapYoutubeButton;
