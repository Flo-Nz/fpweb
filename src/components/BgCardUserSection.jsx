import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  Spinner,
} from "@nextui-org/react";
import { capitalize, find } from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
import { CheckIcon, ChevronDown, DiscordIcon } from "./Icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUserRating } from "../lib/api";
import { useState } from "react";

const getUserRating = (boardgame, discordId) => {
  if (!discordId) {
    return null;
  }
  const userRating = find(
    boardgame.discordOrop?.ratings,
    (elem) => elem.userId === discordId
  );
  return userRating?.rating;
};

const BgCardUserSection = ({ boardgame, userInfos }) => {
  const queryClient = useQueryClient();
  const ratings = ["1", "2", "3", "4", "5"];
  const [error, setError] = useState(null);
  const intl = useIntl();

  const updateRating = useMutation({
    mutationFn: ({ title, userId, rating }) =>
      postUserRating(title, userId, rating),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
    },
    onError: (err) => setError(err),
  });

  if (!userInfos.isLogged) {
    return (
      <div className="mt-2">
        <h1 className="font-semibold">
          <FormattedMessage id="Common.Unconnected" />
        </h1>
        <div className="flex flew-row items-center mt-4">
          <Link href={process.env.DISCORD_OAUTH_URL}>
            <Button
              size="sm"
              startContent={<DiscordIcon fill="white" />}
              className="bg-indigo-500 text-primary"
            >
              <FormattedMessage id="BgCardUserSection.LoginButton" />
            </Button>
          </Link>
          <div className="ml-2">
            <FormattedMessage id="BgCardUserSection.Login" />
          </div>
        </div>
      </div>
    );
  }
  const { username, discordId } = userInfos;
  const userRating = getUserRating(boardgame, discordId);

  return (
    <div className="mt-2">
      <h1 className="font-semibold">{capitalize(username)}</h1>
      <div className="flex flex-row items-center">
        <div>
          {userRating ? (
            <Dropdown
              placement="bottom-end"
              backdrop="blur"
              aria-label="rating"
            >
              <DropdownTrigger>
                <Button
                  endContent={
                    updateRating.isPending ? (
                      <Spinner />
                    ) : (
                      <ChevronDown fill={"currentColor"} />
                    )
                  }
                >
                  <Image src={`/${userRating}.webp`} width={35} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(rating) =>
                  updateRating.mutate({
                    title: boardgame.title[0],
                    userId: discordId,
                    rating,
                  })
                }
              >
                {ratings.map((rating) => (
                  <DropdownItem
                    key={rating}
                    description={intl.formatMessage({
                      id: `Ratings.${rating}`,
                    })}
                  >
                    <Image src={`/${rating}.webp`} width={25} />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Dropdown
              placement="bottom-end"
              backdrop="blur"
              aria-label="rating"
            >
              <DropdownTrigger>
                <Button
                  endContent={
                    updateRating.isPending ? (
                      <Spinner />
                    ) : (
                      <ChevronDown fill={"currentColor"} />
                    )
                  }
                >
                  <FormattedMessage id="BgCardUserSection.RateThisBg" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(rating) =>
                  updateRating.mutate({
                    title: boardgame.title[0],
                    userId: discordId,
                    rating,
                  })
                }
              >
                {ratings.map((rating) => (
                  <DropdownItem
                    key={rating}
                    description={intl.formatMessage({
                      id: `Ratings.${rating}`,
                    })}
                  >
                    <Image src={`/${rating}.webp`} width={25} />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
        {updateRating.isSuccess && (
          <div>
            <Button
              variant="light"
              color="success"
              size="sm"
              disableAnimation
              disableRipple
              isIconOnly
            >
              <CheckIcon color="currentColor" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BgCardUserSection;
