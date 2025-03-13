import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  Spinner,
} from "@heroui/react";
import { capitalize, find } from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
import { CheckIcon, ChevronDown, DiscordIcon } from "./Icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUserRating, removeUserRating } from "../lib/api";
import { useState } from "react";
import useScreenMobile from "../hooks/useScreenMobile";
import DiscordLoginButton from "./DiscordLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";

const getUserRating = (boardgame, userId) => {
  if (!userId) {
    return null;
  }
  const userRating = find(
    boardgame.discordOrop?.ratings,
    (elem) => elem.userId === userId
  );
  return userRating?.rating;
};

const BgCardUserSection = ({ boardgame, userInfos }) => {
  const queryClient = useQueryClient();
  const ratings = ["1", "2", "3", "4", "5"];
  const [error, setError] = useState(null);
  const intl = useIntl();

  const updateRating = useMutation({
    mutationFn: ({ title, rating }) => postUserRating(title, rating),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
    },
    onError: (err) => setError(err),
  });

  const removeRating = useMutation({
    mutationFn: ({ title }) => removeUserRating(title),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
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
          <div className="flex flex-col gap-2 mr-8">
            <DiscordLoginButton size={"1.5em"} />
            <GoogleLoginButton size={"1.5em"} />
          </div>
          <div className="ml-2">
            <FormattedMessage id="BgCardUserSection.Login" />
          </div>
        </div>
      </div>
    );
  }
  const { username, userId } = userInfos;
  const userRating = getUserRating(boardgame, userId);
  const isMobile = useScreenMobile();

  return (
    <div className="mt-2">
      <h1 className="font-semibold">{capitalize(username)}</h1>
      <div className="flex flex-row items-center">
        <div>
          <Dropdown showArrow backdrop={!isMobile ? "blur" : "transparent"}>
            <DropdownTrigger>
              <Button endContent={<ChevronDown fill={"currentColor"} />}>
                {userRating ? (
                  <Image src={`/${userRating}.webp`} width={35} />
                ) : (
                  <FormattedMessage id="BgCardUserSection.RateThisBg" />
                )}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(rating) =>
                updateRating.mutate({
                  title: boardgame.title[0],
                  userId,
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
      <div>
        <Button
          variant="light"
          onPress={() => removeRating.mutate({ title: boardgame.title[0] })}
          color="danger"
          size="sm"
          className={userRating ? "" : "invisible"}
        >
          <FormattedMessage id="BgCardUserSection.RemoveRating" />
        </Button>
      </div>
    </div>
  );
};

export default BgCardUserSection;
