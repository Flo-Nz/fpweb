import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoardgame } from "../lib/api";
import { useState, useEffect, useCallback, memo } from "react";
import { AddIcon, CancelIcon, SaveIcon, TrashIcon } from "./Icons";
import { FormattedMessage, useIntl } from "react-intl";
import { filter } from "lodash";

const UpdateBoardgameModal = ({ boardgame, isOpen, onOpenChange }) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [editedTitles, setEditedTitles] = useState([]);

  const intl = useIntl();

  useEffect(() => {
    if (boardgame) {
      setEditedTitles([...boardgame.title]);
    }
  }, [boardgame]);

  const updateBoardgameMutation = useMutation({
    mutationFn: ({ id, payload }) => updateBoardgame(id, payload),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({
        queryKey: ["searchResults"],
      });
      queryClient.invalidateQueries({
        queryKey: ["myRatings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["allOrops"],
      });
    },
    onError: (err) => setError(err),
  });

  const handleUpdate = useCallback(() => {
    if (boardgame) {
      updateBoardgameMutation.mutate({
        id: boardgame.id,
        payload: { title: editedTitles },
      });
    }
  }, [boardgame, editedTitles, updateBoardgameMutation]);

  const handleChange = useCallback(
    (index) => (value) => {
      setEditedTitles((prevTitles) => {
        const newTitles = [...prevTitles];
        newTitles[index] = value;
        return newTitles;
      });
    },
    []
  );

  const addTitleInput = useCallback(() => {
    setEditedTitles((prevTitles) => [...prevTitles, ""]);
  }, []);

  const removeTitleInput = useCallback((index) => {
    setEditedTitles((prevTitles) => filter(prevTitles, (_, i) => i !== index));
  }, []);

  const isRequiredInvalid = useCallback(
    () => !editedTitles[0] || editedTitles[0] === "",
    [editedTitles]
  );

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
                id="UpdateBoardgameModal.Title"
                values={{ title: boardgame?.title[0] }}
              />
            </ModalHeader>
            <ModalBody>
              {editedTitles?.map((title, index) => (
                <div key={index} className="flex items-center gap-1">
                  <Input
                    isClearable
                    variant="faded"
                    color={index === 0 ? "success" : "warning"}
                    size="lg"
                    value={title}
                    placeholder={intl.formatMessage({
                      id: "UpdateBoardgameModal.NewTitlePlaceholder",
                    })}
                    onValueChange={handleChange(index)}
                    radius="lg"
                    label={intl.formatMessage(
                      {
                        id:
                          index === 0
                            ? "Common.Title.First"
                            : "Common.Title.Alternate",
                      },
                      { index }
                    )}
                    autoFocus={index === 0}
                    isRequired={index === 0}
                    isInvalid={isRequiredInvalid(index, title)}
                    errorMessage="Veuillez entrer un titre"
                  />
                  <Button
                    isIconOnly
                    variant="bordered"
                    className="border-transparent"
                    onPress={() => removeTitleInput(index)}
                  >
                    <TrashIcon size="2em" />
                  </Button>
                </div>
              ))}

              {editedTitles.length < 6 && (
                <Button
                  className="bg-gray-300 text-grey-500"
                  onPress={addTitleInput}
                >
                  <AddIcon />
                  <FormattedMessage id="UpdateBoardgameModal.AddTitle" />
                </Button>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                <CancelIcon size="2em" />
                <span className="hidden lg:flex">
                  <FormattedMessage id="UpdateBoardgameModal.Close" />
                </span>
              </Button>
              <Button
                color="success"
                onPress={() => {
                  handleUpdate();
                  onClose();
                }}
                disabled={isRequiredInvalid()}
              >
                <SaveIcon size="2em" />
                <span className="hidden lg:flex">
                  <FormattedMessage id="UpdateBoardgameModal.Save" />
                </span>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default memo(UpdateBoardgameModal);
