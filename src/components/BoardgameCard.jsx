import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  useDisclosure,
} from "@heroui/react";
import { capitalize, toUpper, upperCase } from "lodash";
import YoutubeEmbed from "./YoutubeEmbed";
import {
  CartIcon,
  DiscordIcon,
  EditIcon,
  UsersIcon,
  YoutubeIcon,
} from "./Icons";
import { FormattedMessage, useIntl } from "react-intl";
import { useState } from "react";
import BgCardUserSection from "./BgCardUserSection";
import AskForOropButton from "./AskForOropButton";
import { Link } from "react-router-dom";
import { userCanEdit } from "../lib/user";
import UpdateBoardgameModal from "./UpdateBoardgameModal";

const BoardgameCard = ({ boardgame, userInfos }) => {
  const [displayEmbed, setDisplayEmbed] = useState(false);
  const { _id, title, discordRating, discordOrop, searchCount, fpOrop } =
    boardgame;

  const intl = useIntl();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const editionEnabled = userCanEdit(userInfos?.discordRoles);

  return (
    <Card
      className="bg-gradient-to-b from-zinc-200 to-slate-200"
      fullWidth
      shadow="md"
      key={_id.toString()}
    >
      <CardHeader>
        <div className="w-full">
          <h1 className="font-semibold">{toUpper(title[0])}</h1>
          <div className="flex flex-row justify-between mt-2">
            <div className="flex flex-row ml-0 mt-auto mb-auto">
              <Image src="/yoel.jpg" width={30} />
              {fpOrop?.rating ? (
                <Image
                  src={`/${fpOrop.rating}.webp`}
                  width={35}
                  className="ml-1"
                />
              ) : (
                <span className="mt-auto mb-auto ml-1">Non noté</span>
              )}
            </div>
            <div className="flex flex-row mt-auto mb-auto items-center">
              <UsersIcon size="2em" />
              {discordRating ? (
                <Image
                  src={`/${discordRating}.webp`}
                  width={35}
                  className="ml-1"
                />
              ) : (
                <span className="mt-auto mb-auto ml-1">
                  <FormattedMessage id="Ratings.NoRating" />
                </span>
              )}
            </div>
          </div>
          {discordRating && (
            <div className="w-full text-right text-sm">
              <FormattedMessage
                id="BgCard.DiscordRating"
                values={{ totalUsers: discordOrop?.ratings?.length }}
              />
            </div>
          )}
          {!discordRating && (
            <div className="w-full text-right text-sm invisible">
              <FormattedMessage
                id="BgCard.DiscordRating"
                values={{ totalUsers: 0 }}
              />
            </div>
          )}
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex m-auto min-h-64 my-auto items-center">
          {fpOrop?.youtubeUrl && !displayEmbed && (
            <div className="flex flex-col">
              <Button
                color="danger"
                startContent={<YoutubeIcon fill={"currentColor"} />}
                onPress={() => setDisplayEmbed(true)}
                className="cursor-pointer"
              >
                <FormattedMessage id="Orop.Watch" />
              </Button>
              <AskForOropButton
                classNames={{ button: "mt-2 invisible" }}
                boardgame={boardgame}
                userInfos={userInfos}
              />
            </div>
          )}
          {displayEmbed && <YoutubeEmbed youtubeUrl={fpOrop?.youtubeUrl} />}
          {!fpOrop?.youtubeUrl && (
            <div className="flex flex-col">
              <Button
                startContent={<YoutubeIcon fill={"currentColor"} />}
                disabled
                disableAnimation
                disableRipple
                className="text-gray-500"
              >
                <FormattedMessage id="Orop.Missing" />
              </Button>
              <AskForOropButton
                classNames={{ button: "mt-2" }}
                boardgame={boardgame}
                userInfos={userInfos}
              />
            </div>
          )}
        </div>
        <Divider className="mt-6" />
        <div className="flex">
          <BgCardUserSection userInfos={userInfos} boardgame={boardgame} />
        </div>
        <Divider className="mt-2" />
        <div className="bg-transparent text-sm text-right grid grid-cols-1 flex-1 mt-2">
          {boardgame.title.length > 1 && (
            <div className="w-full">
              <span className="font-semibold">
                {intl.formatMessage({ id: "Boardgame.AlternateTitles" })} :{" "}
              </span>
              {boardgame.title.slice(1).map((alternateTitle, index) => (
                <span key={alternateTitle + index}>
                  {capitalize(alternateTitle)}
                  {index === boardgame.title.slice(1).length - 1
                    ? ""
                    : ","}{" "}
                </span>
              ))}
            </div>
          )}
          <FormattedMessage id="Common.SearchCount" values={{ searchCount }} />
        </div>
      </CardBody>
      <CardFooter className="flex justify-between">
        <Link
          to={`https://www.ludum.fr/rechercher?s=${encodeURI(
            boardgame.title[0]
          )}&aff=84`}
          target="blank"
        >
          <Button className="hover:bg-red-600 hover:text-white" size="sm">
            <CartIcon size="2em" />
            <FormattedMessage id="BgCard.Ludum" />
          </Button>
        </Link>
        {editionEnabled && (
          <>
            <Button
              className="hover:bg-green-600 hover:text-white"
              size="sm"
              onPress={onOpen}
            >
              <EditIcon size="2em" />
              <FormattedMessage id="BgCard.Edit" />
            </Button>
            <UpdateBoardgameModal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              boardgame={boardgame}
            />
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default BoardgameCard;
