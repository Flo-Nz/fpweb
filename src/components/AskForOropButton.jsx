import { Button } from "@nextui-org/react";
import { includes } from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAskForOrop } from "../lib/api";
import { useState } from "react";

const AskForOropButton = ({ boardgame, userInfos, className }) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const intl = useIntl();

  const askForOrop = useMutation({
    mutationFn: ({ title }) => postAskForOrop(title),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
    },
    onError: (err) => setError(err),
  });

  if (!userInfos.isLogged) {
    return (
      <Popover placement="top" showArrow={true} className={className}>
        <PopoverTrigger>
          <Button variant="light" size="sm" color="success">
            <FormattedMessage id="Orop.Ask" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <FormattedMessage id="Error.NeedLogin.Orop.Ask" />
        </PopoverContent>
      </Popover>
    );
  }

  const { discordId } = userInfos;

  if (includes(boardgame.askedBy, discordId)) {
    return (
      <Button
        variant="light"
        size="sm"
        color="secondary"
        className={className}
        isDisabled
      >
        <FormattedMessage id="Orop.Ask.Already" />
      </Button>
    );
  }

  return (
    <Button
      variant="light"
      size="sm"
      color="success"
      className={className}
      onPress={() => askForOrop.mutate({ title: boardgame.title[0] })}
    >
      <FormattedMessage id="Orop.Ask" />
    </Button>
  );
};

export default AskForOropButton;
