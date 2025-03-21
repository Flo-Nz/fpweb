import { Button, TableCell, useDisclosure } from "@heroui/react";
import { EditIcon } from "./Icons";
import { FormattedMessage } from "react-intl";
import UpdateBoardgameModal from "./UpdateBoardgameModal";

const EditTableCell = ({ boardgame }) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  return (
    <>
      <Button
        className="hover:bg-green-600 hover:text-white"
        size="sm"
        onPress={onOpen}
      >
        <EditIcon size="2em" />
        <div className="hidden lg:flex">
          <FormattedMessage id="BgCard.Edit" />
        </div>
      </Button>
      <UpdateBoardgameModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        boardgame={boardgame}
      />
    </>
  );
};

export default EditTableCell;
