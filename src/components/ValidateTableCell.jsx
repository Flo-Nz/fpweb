import { Button, TableCell, useDisclosure } from "@heroui/react";
import { CancelIcon, CheckIcon } from "./Icons";
import { FormattedMessage } from "react-intl";
import UpdateBoardgameModal from "./UpdateBoardgameModal";
import DeleteBoardgameConfirmationModal from "./DeleteBoardgameConfirmationModal";
import ValidateBoardgameConfirmationModal from "./ValidateBoardgameConfirmationModal";

const ValidateTableCell = ({ boardgame }) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  return (
    <div className="flex items-center justify-center">
      <Button
        isIconOnly
        size="sm"
        variant="bordered"
        onPress={onOpen}
        color="success"
        className="border-transparent hover:bg-green-500"
      >
        <CheckIcon size="3em" />
      </Button>
      <ValidateBoardgameConfirmationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        boardgame={boardgame}
      />
    </div>
  );
};

export default ValidateTableCell;
