import { Button, Card, CardBody, Image } from "@heroui/react";
import { PlusIcon } from "../components/Icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import parse from "html-react-parser";

const Home = () => {
  const intl = useIntl();

  return (
    <div id="intro">
      <Card
        isBlurred
        className="border-none max-w-[100%] mb-2 mt-6 bg-neutral-200"
        shadow="sm"
      >
        <CardBody>
          <div className="flex flex-col gap-0 text-center">
            <h1 className="font-medium text-xl font-semibold">FIRSTPLAYER</h1>
            <p className="gap-0 text-small italic text-center">
              <i>
                <FormattedMessage id="Home.Subtitle" />
              </i>
            </p>
          </div>

          <div className="flex flex-col gap-0 items-center lg:items-start">
            <div className="flex flex-col gap-0">
              <h1 className="font-medium text-xl mt-6 lg:mt-0">
                <FormattedMessage id="Home.WhoAmI" />
              </h1>
              <p className="gap-0 text-small italic text-center lg:text-start">
                <i>Yoël Sayada</i>
              </p>
            </div>
            <div className="pt-4 pb-2 grid grid-flow-row gap-4 grid-cols-1 lg:grid-flow-col lg:grid-cols-5">
              <div className="col-span-2 m-auto lg:col-start-1 lg:col-end-1 lg:col-span-1 lg:m-0">
                <Image
                  alt="Profile picture"
                  className="object-cover"
                  shadow="sm"
                  src="./yoel.jpg"
                  width={200}
                />
              </div>
              <div className="lg:col-span-4 m-auto">
                {parse(intl.formatMessage({ id: "Home.Intro" }))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;
