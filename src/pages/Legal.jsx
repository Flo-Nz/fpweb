import { Card, CardBody } from "@heroui/react";
import { useIntl } from "react-intl";
import parse from "html-react-parser";

const Legal = () => {
  const intl = useIntl();
  return (
    <div id="legal">
      <Card
        isBlurred
        className="border-none max-w-[100%] mb-2 mt-6 text-primary bg-neutral-200"
        shadow="sm"
      >
        <CardBody>
          <div className="flex flex-col gap-0 text-center">
            <h1 className="font-medium text-xl">
              {intl.formatMessage({ id: "Legal.Title" }).toUpperCase()}
            </h1>
            <div className="text-left">
              {parse(intl.formatMessage({ id: "Legal.Mentions" }))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Legal;
