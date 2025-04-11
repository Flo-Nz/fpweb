import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@heroui/react";
import { capitalize, find } from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
import { CheckIcon, ChevronDownIcon, UsersIcon } from "./Icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUserRating, removeUserRating } from "../lib/api";
import { useState } from "react";
import DiscordLoginButton from "./DiscordLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";
import { useUserInfos } from "../providers/UserInfosContext";
import { getUserRating, ratings } from "../lib/shared";

const BgCardUserSection = ({ boardgame }) => {
  const userInfos = useUserInfos();
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const intl = useIntl();

  const updateRating = useMutation({
    mutationFn: ({ title, rating }) => postUserRating(title, rating),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
      queryClient.invalidateQueries({ queryKey: ["allOrops"] });
    },
    onError: (err) => setError(err),
  });

  const removeRating = useMutation({
    mutationFn: ({ title }) => removeUserRating({ title, rating: "true" }),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
      queryClient.invalidateQueries({ queryKey: ["allOrops"] });
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
  const { username, userId, avatar } = userInfos;
  const userRating = getUserRating(boardgame, userId);

  return (
    <div className="mt-2">
      <div className="flex flex-row items-center mb-2 gap-2">
        {avatar ? <Image src={avatar} width={30} /> : <UsersIcon size="2em" />}
        <h1 className="font-semibold">{capitalize(username)}</h1>
      </div>
      <div className="flex flex-row items-center">
        <div>
          <Dropdown showArrow backdrop="blur">
            <DropdownTrigger>
              <Button endContent={<ChevronDownIcon size="1.5em" />}>
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
