import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { upperCase } from "lodash";
import YoutubeEmbed from "./YoutubeEmbed";
import { YoutubeIcon } from "./Icons";
import { FormattedMessage } from "react-intl";
import { useState } from "react";

const BoardgameCard = ({ boardgame }) => {
  const [displayEmbed, setDisplayEmbed] = useState(false);
  const { _id, title, discordRating, discordOrop, searchCount, fpOrop } =
    boardgame;

  console.log("Boardgame", boardgame);
  return (
    <Card
      className="pb-4"
      fullWidth
      shadow="sm"
      isFooterBlurred
      key={_id.toString()}
    >
      <CardHeader>
        <h1 className="font-semibold">{upperCase(title[0])}</h1>
      </CardHeader>
      <CardBody>
        {fpOrop?.youtubeUrl && !displayEmbed && (
          <div className="flex flex-col m-auto">
            <Button
              color="danger"
              startContent={<YoutubeIcon fill={"currentColor"} />}
              onPress={() => setDisplayEmbed(true)}
              className="cursor-pointer"
            >
              <FormattedMessage id="Orop.Watch" />
            </Button>
          </div>
        )}
        {displayEmbed && (
          <div className="flex flex-col m-auto">
            <YoutubeEmbed youtubeUrl={fpOrop?.youtubeUrl} />
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default BoardgameCard;
