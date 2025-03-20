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
import { postAskForOrop, updateBoardgame } from "../lib/api";
import { useState } from "react";
import { AddIcon, DbIcon, TrashIcon } from "./Icons";
import { FormattedMessage, useIntl } from "react-intl";
import { filter } from "lodash";

const UpdateBoardgameModal = ({ boardgame, isOpen, onOpenChange }) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [editedTitles, setEditedTitles] = useState([...boardgame.title]);

  const intl = useIntl();

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
    },
    onError: (err) => setError(err),
  });

  const handleUpdate = () =>
    updateBoardgameMutation.mutate({
      id: boardgame.id,
      payload: { title: editedTitles },
    });

  const handleChange = (index) => (value) => {
    const newTitles = [...editedTitles];
    newTitles[index] = value;
    setEditedTitles(newTitles);
  };

  const addTitleInput = () => {
    setEditedTitles([...editedTitles, ""]);
  };

  const removeTitleInput = (index) => {
    const newEditedTitles = filter(editedTitles, (_, i) => i !== index);
    setEditedTitles(newEditedTitles);
  };

  const isRequiredInvalid = () => !editedTitles[0] || editedTitles[0] === "";

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <FormattedMessage
                id="UpdateBoardgameModal.Title"
                values={{ title: boardgame.title[0] }}
              />
            </ModalHeader>
            <ModalBody>
              {editedTitles.map((title, index) => (
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
                    autoFocus={index === 0 ? true : false}
                    isRequired={index === 0 ? true : false}
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
                  Ajouter un titre alternatif
                </Button>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="success"
                onPress={() => {
                  handleUpdate();
                  onClose();
                }}
                disabled={isRequiredInvalid()}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateBoardgameModal;
