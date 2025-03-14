import { Button, Card, CardBody, Image } from "@heroui/react";
import {
  AskOropIcon,
  CartIcon,
  DbIcon,
  MyRatingsIcon,
  PlusIcon,
  SearchIcon,
} from "../components/Icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { delay } from "lodash";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div id="intro">
      <Card
        isBlurred
        className="border-none max-w-[100%] mb-2 mt-6 bg-neutral-200"
        shadow="sm"
      >
        <CardBody>
          <div className="flex flex-col gap-0 text-center">
            <h1 className="font-medium text-2xl font-semibold">FIRSTPLAYER</h1>
            <p className="gap-0 text-small italic text-center">
              <i>
                <FormattedMessage id="Home.Subtitle" />
              </i>
            </p>
          </div>

          <div className="mt-4 text-center">
            <h2>
              Rechercher des épisodes de l'émission "On rejoue ou pas ?", faire
              ta propre notation ou demander à Yoël de traiter un jeu spécifique
              ? Tout est possible ici !
            </h2>
            <div className="m-auto w-3/4 grid auto-rows-fr gap-4 mt-8 mb-8">
              <Button
                className="h-fit bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                onPress={() => delay(navigate, 300, "/boardgames/search")}
              >
                <div className="grid grid-rows-2 gap-4 items-center p-2">
                  <div className="m-auto">
                    <DbIcon />
                  </div>
                  <div>
                    <div className="font-bold text-2xl pb-4">
                      <FormattedMessage id="Home.Orop" />
                    </div>
                    <div className="italic text-wrap">
                      <FormattedMessage id="Home.Orop.Subtitle" />
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                className="h-fit bg-gradient-to-tr from-fuchsia-500 to-cyan-500 text-white shadow-lg"
                onPress={() => delay(navigate, 300, "/my-account/ratings")}
              >
                <div className="grid grid-rows-2 gap-4 items-center p-2">
                  <div className="m-auto">
                    <MyRatingsIcon />
                  </div>
                  <div>
                    <div className="font-bold text-2xl pb-4">
                      <FormattedMessage id="Home.MyRatings" />
                    </div>
                    <div className="italic text-wrap">
                      <FormattedMessage id="Home.MyRatings.Subtitle" />
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                className="h-fit bg-gradient-to-tr from-cyan-500 to-yellow-500 text-white shadow-lg"
                onPress={() => delay(navigate, 300, "/boardgames/top/asked")}
              >
                <div className="grid grid-rows-2 gap-4 items-center p-2">
                  <div className="m-auto">
                    <AskOropIcon />
                  </div>
                  <div>
                    <div className="font-bold text-2xl pb-4">
                      <FormattedMessage id="Home.VoteForOrop" />
                    </div>
                    <div className="italic text-wrap">
                      <FormattedMessage id="Home.VoteForOrop.Subtitle" />
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;
