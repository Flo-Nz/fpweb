import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { capitalize, upperCase } from "lodash";
import YoutubeEmbed from "./YoutubeEmbed";
import { DiscordIcon, YoutubeIcon } from "./Icons";
import { FormattedMessage, useIntl } from "react-intl";
import { useState } from "react";
import BgCardUserSection from "./BgCardUserSection";

const BoardgameCard = ({ boardgame, userInfos }) => {
  const [displayEmbed, setDisplayEmbed] = useState(false);
  const { _id, title, discordRating, discordOrop, searchCount, fpOrop } =
    boardgame;

  const intl = useIntl();

  return (
    <Card
      className="bg-gradient-to-b from-zinc-200 to-slate-200"
      fullWidth
      shadow="md"
      key={_id.toString()}
    >
      <CardHeader>
        <div className="w-full">
          <h1 className="font-semibold">{upperCase(title[0])}</h1>
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
              <Button
                isIconOnly
                disabled
                disableAnimation
                disableRipple
                radius="full"
                size="sm"
                className="bg-indigo-500 text-primary p-0 max-w-10"
              >
                <DiscordIcon fill={"currentColor"} />
              </Button>
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
              Noté par {discordOrop.ratings.length} utilisateurs
            </div>
          )}
          {!discordRating && (
            <div className="invisible text-sm">Aucune note</div>
          )}
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-col m-auto min-h-64">
          {fpOrop?.youtubeUrl && !displayEmbed && (
            <Button
              color="danger"
              startContent={<YoutubeIcon fill={"currentColor"} />}
              onPress={() => setDisplayEmbed(true)}
              className="cursor-pointer"
            >
              <FormattedMessage id="Orop.Watch" />
            </Button>
          )}
          {displayEmbed && <YoutubeEmbed youtubeUrl={fpOrop?.youtubeUrl} />}
          {!fpOrop?.youtubeUrl && (
            <>
              <Button
                startContent={<YoutubeIcon fill={"currentColor"} />}
                disabled
                disableAnimation
                disableRipple
                className="text-gray-500"
              >
                <FormattedMessage id="Orop.Missing" />
              </Button>
            </>
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
    </Card>
  );
};

export default BoardgameCard;
