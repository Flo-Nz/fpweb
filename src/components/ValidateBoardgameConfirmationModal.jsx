import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, memo, useState } from "react";
import { BackIcon, CancelIcon, CheckIcon, TrashIcon } from "./Icons";
import { FormattedMessage } from "react-intl";
import { validateBoardgame } from "../lib/api";

const ValidateBoardgameConfirmationModal = ({
  boardgame,
  isOpen,
  onOpenChange,
}) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const validateBoardgameMutation = useMutation({
    mutationFn: ({ id }) => validateBoardgame(id),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({
        queryKey: ["pendingBoardgames"],
      });
      queryClient.invalidateQueries({
        queryKey: ["allOrops"],
      });
    },
    onError: ({ response }) => {
      setError(response.data);
    },
  });

  const handleValidate = useCallback(() => {
    if (boardgame) {
      validateBoardgameMutation.mutate({ id: boardgame.id });
    }
  }, [boardgame, validateBoardgameMutation]);

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
                id="ValidateBoardgameConfirmationmodal.Title"
                values={{ title: boardgame?.title[0] }}
              />
            </ModalHeader>
            <ModalBody>
              <div className="pt-8 pb-8 text-center">
                <FormattedMessage
                  id="ValidateBoardgameConfirmationmodal.Description"
                  values={{ title: boardgame?.title[0] }}
                />
              </div>
              {error && <p className="text-red-500">{error.message}</p>}
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} color="danger">
                <CancelIcon size="2em" />
                <FormattedMessage id="ValidateBoardgameConfirmationmodal.No" />
              </Button>
              <Button
                color="success"
                onPress={() => {
                  handleValidate();
                  onClose();
                }}
              >
                <CheckIcon size="2em" />
                <FormattedMessage id="ValidateBoardgameConfirmationmodal.Yes" />
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default memo(ValidateBoardgameConfirmationModal);
