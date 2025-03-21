import { Button, TableCell, useDisclosure } from "@heroui/react";
import { CancelIcon } from "./Icons";
import { FormattedMessage } from "react-intl";
import UpdateBoardgameModal from "./UpdateBoardgameModal";
import DeleteBoardgameConfirmationModal from "./DeleteBoardgameConfirmationModal";

const DeleteTableCell = ({ boardgame }) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  return (
    <div className="flex items-center justify-center">
      <Button
        isIconOnly
        size="sm"
        variant="bordered"
        onPress={onOpen}
        color="danger"
        className="border-transparent hover:bg-red-500"
      >
        <CancelIcon size="2em" />
      </Button>
      <DeleteBoardgameConfirmationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        boardgame={boardgame}
      />
    </div>
  );
};

export default DeleteTableCell;
