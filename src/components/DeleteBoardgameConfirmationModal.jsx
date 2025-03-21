import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoardgame } from "../lib/api";
import { useCallback, memo, useState } from "react";
import { BackIcon, TrashIcon } from "./Icons";
import { FormattedMessage } from "react-intl";

const DeleteBoardgameConfirmationModal = ({
  boardgame,
  isOpen,
  onOpenChange,
}) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const deleteBoardgameMutation = useMutation({
    mutationFn: ({ id }) => deleteBoardgame(id),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
      queryClient.invalidateQueries({ queryKey: ["allOrops"] });
    },
    onError: (err) => setError(err),
  });

  const handleDelete = useCallback(() => {
    if (boardgame) {
      deleteBoardgameMutation.mutate({ id: boardgame.id });
    }
  }, [boardgame, deleteBoardgameMutation]);

  if (!boardgame) {
    return null; // Return null if boardgame is not defined
  }

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <FormattedMessage
                id="DeleteBoardgameConfirmationmodal.Title"
                values={{ title: boardgame?.title[0] }}
              />
            </ModalHeader>
            <ModalBody>
              <div className="pt-8 pb-8 text-center">
                <FormattedMessage
                  id="DeleteBoardgameConfirmationmodal.Description"
                  values={{ title: boardgame?.title[0] }}
                />
              </div>
              {error && <p className="text-red-500">{error.message}</p>}
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>
                <BackIcon size="2em" />
                <FormattedMessage id="DeleteBoardgameConfirmationmodal.No" />
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  handleDelete();
                  onClose();
                }}
              >
                <TrashIcon size="2em" />
                <FormattedMessage id="DeleteBoardgameConfirmationmodal.Yes" />
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default memo(DeleteBoardgameConfirmationModal);
