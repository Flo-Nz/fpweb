import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@heroui/react";
import { capitalize, toUpper } from "lodash";
import { AddIcon, QuestionIcon, UsersQuestionIcon } from "./Icons";
import { FormattedMessage, useIntl } from "react-intl";
import { useUserInfos } from "../providers/UserInfosContext";
import AddBoardgameModal from "./AddBoardgameModal";

const EmptyBoardgameCard = () => {
  const userInfos = useUserInfos();

  const intl = useIntl();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card
      className="bg-gradient-to-b from-zinc-200 to-slate-200 outline-dashed outline-1 outline-slate-400"
      fullWidth
      shadow="none"
    >
      <CardHeader>
        <div className="w-full">
          <h1 className="font-semibold">
            {toUpper(intl.formatMessage({ id: "Common.NoResult" }))}
          </h1>
          <div className="flex flex-row justify-between mt-2">
            <div className="flex flex-row ml-0 mt-auto mb-auto">
              <QuestionIcon size="2em" />
            </div>
            <div className="flex flex-row mt-auto mb-auto items-center">
              <UsersQuestionIcon size="2em" />
            </div>
          </div>
          <div className="w-full text-right text-sm invisible">
            <FormattedMessage id="BgCard.NotFound" />
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex m-auto min-h-64 my-auto items-center">
          <div className="flex flex-col">
            {userInfos?.isLogged ? (
              <>
                <Button
                  variant="ghost"
                  startContent={<AddIcon size="3em" />}
                  className="outline-dashed outline-1 outline-slate-400 border-none data-[hover=true]:bg-zinc-300 text-slate-600"
                  onPress={onOpen}
                >
                  <FormattedMessage id="Common.AddBoardgame" />
                </Button>
                <AddBoardgameModal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                />
              </>
            ) : (
              <Popover placement="top">
                <PopoverTrigger>
                  <Button
                    variant="ghost"
                    startContent={<AddIcon size="3em" />}
                    className="outline-dashed outline-1 outline-slate-400 border-none data-[hover=true]:bg-zinc-300 text-slate-600"
                  >
                    <FormattedMessage id="Common.AddBoardgame" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="text-tiny">
                    <FormattedMessage id="Error.NeedLogin" />
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <Divider className="mt-6" />
        <div className="flex">
          <div className="mt-2">
            <h1 className="font-semibold">{capitalize(userInfos.username)}</h1>
            <div className="flex flex-row items-center">
              <FormattedMessage id="EmptyBoardgameCard.Description" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EmptyBoardgameCard;
