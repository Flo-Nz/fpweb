import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback, memo } from "react";
import {
  AddIcon,
  CancelIcon,
  ChevronDownIcon,
  SaveIcon,
  TrashIcon,
} from "./Icons";
import { FormattedMessage, useIntl } from "react-intl";
import { filter } from "lodash";
import { useUserInfos } from "../providers/UserInfosContext";
import { addBoardgame } from "../lib/api";
import { useLocation, useNavigate } from "react-router-dom";

const AddBoardgameModal = ({ isOpen, onOpenChange }) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [editedTitles, setEditedTitles] = useState([""]);
  const [userRating, setUserRating] = useState();
  const ratings = ["1", "2", "3", "4", "5"];
  const userInfos = useUserInfos();
  const { userId } = userInfos;

  const intl = useIntl();

  const addBoardgameMutation = useMutation({
    mutationFn: ({ payload }) => addBoardgame(payload),
    onSuccess: ({ title }) => {
      console.log("success !");
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
      onOpenChange(); // Close the modal here
      window.location.search = `?page=1&title=${title[0]}`;
      console.log(window.location);
    },
    onError: ({ response }) => {
      setError(response.data);
    },
  });

  console.log("error message", error);

  const handleAdd = useCallback(() => {
    const payload = {};
    payload.title = editedTitles;
    if (userRating) {
      payload.discordOrop = { ratings: [{ rating: userRating, userId }] };
    }
    addBoardgameMutation.mutate({
      payload,
    });
  }, [editedTitles, addBoardgameMutation]);

  const handleTitleChange = useCallback(
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

  const isRequiredInvalid = !editedTitles[0] || editedTitles[0] === "";

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <FormattedMessage
                id="Common.AddBoardgameModal.Title"
                values={{ title: editedTitles[0] }}
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
                    onValueChange={handleTitleChange(index)}
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
                    isInvalid={isRequiredInvalid}
                    errorMessage={intl.formatMessage({ id: "Error.AddTitle" })}
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
              <Dropdown showArrow backdrop="blur">
                <DropdownTrigger>
                  <Button endContent={<ChevronDownIcon size="1.5em" />}>
                    {userRating ? (
                      <Image src={`/${userRating}.webp`} width={35} />
                    ) : (
                      <FormattedMessage id="BgCardUserSection.RateThisBg" />
                    )}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu onAction={setUserRating}>
                  {ratings.map((rating) => (
                    <DropdownItem
                      key={rating}
                      description={intl.formatMessage({
                        id: `Ratings.${rating}`,
                      })}
                    >
                      <Image src={`/${rating}.webp`} width={25} />
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              {error && <p className="text-tiny text-red-500">{error}</p>}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                <CancelIcon size="2em" />
                <span className="hidden lg:flex">
                  <FormattedMessage id="UpdateBoardgameModal.Close" />
                </span>
              </Button>
              {isRequiredInvalid ? (
                <Popover placement="top">
                  <PopoverTrigger>
                    <Button color="success">
                      <SaveIcon size="2em" />
                      <span className="hidden lg:flex">
                        <FormattedMessage id="UpdateBoardgameModal.Save" />
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="text-tiny">
                      <FormattedMessage id="Error.AddTitle" />
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button color="success" onPress={handleAdd}>
                  <SaveIcon size="2em" />
                  <span className="hidden lg:flex">
                    <FormattedMessage id="UpdateBoardgameModal.Save" />
                  </span>
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default memo(AddBoardgameModal);
