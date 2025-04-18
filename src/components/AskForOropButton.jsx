import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { includes } from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAskForOrop } from "../lib/api";
import { useState } from "react";
import { useUserInfos } from "../providers/UserInfosContext";

const AskForOropButton = ({ boardgame, classNames, buttonVariant }) => {
  const userInfos = useUserInfos();
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const askForOrop = useMutation({
    mutationFn: ({ title }) => postAskForOrop(title),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
      queryClient.invalidateQueries({ queryKey: ["topAskedOrop"] });
    },
    onError: (err) => setError(err),
  });

  if (!userInfos.isLogged) {
    return (
      <Popover placement="top" showArrow={true} className={classNames?.popover}>
        <PopoverTrigger>
          <Button
            className={classNames?.button}
            variant={buttonVariant || "light"}
            size="sm"
            color="success"
          >
            <FormattedMessage id="Orop.Ask" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <FormattedMessage id="Error.NeedLogin.Orop.Ask" />
        </PopoverContent>
      </Popover>
    );
  }

  const { userId } = userInfos;

  if (includes(boardgame?.askedBy, userId)) {
    return (
      <Button
        variant={buttonVariant || "light"}
        size="sm"
        color="secondary"
        className={classNames?.button}
        isDisabled
      >
        <FormattedMessage id="Orop.Ask.Already" />
      </Button>
    );
  }

  return (
    <Button
      variant={buttonVariant || "light"}
      size="sm"
      color="success"
      className={classNames?.button}
      onPress={() => askForOrop.mutate({ title: boardgame.title[0] })}
    >
      <FormattedMessage id="Orop.Ask" />
    </Button>
  );
};

export default AskForOropButton;
