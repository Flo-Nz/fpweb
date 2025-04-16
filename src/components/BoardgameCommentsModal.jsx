import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { TrashIcon, UsersIcon, EditIcon, ChevronDownIcon } from "./Icons";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { postUserRating, removeUserRating } from "../lib/api";
import { useUserInfos } from "../providers/UserInfosContext";
import { getUserRating, ratings } from "../lib/shared";
import GoogleLoginButton from "./GoogleLoginButton";
import DiscordLoginButton from "./DiscordLoginButton";

const BoardgameCommentsModal = ({ boardgame, isOpen, onOpenChange }) => {
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const userInfos = useUserInfos();
  const { userId } = userInfos;
  const queryClient = useQueryClient();
  const intl = useIntl();
  const [newRating, setNewRating] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const currentRating = getUserRating(boardgame, userId) || null;
      setNewRating(currentRating);
    }
  }, [isOpen, boardgame, userId]);

  const addCommentMutation = useMutation({
    mutationFn: ({ title, rating, comment }) =>
      postUserRating(title, rating, comment),
    onSuccess: (data, variables, context) => {
      setNewComment("");
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
      queryClient.invalidateQueries({ queryKey: ["allOrops"] });
      onOpenChange(false);
    },
    onError: (err) => setError(err),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({ title }) =>
      removeUserRating({ title, rating: "true", comment: "true" }),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
      queryClient.invalidateQueries({ queryKey: ["allOrops"] });
      onOpenChange(false);
    },
    onError: (err) => setError(err),
  });

  const handleSubmit = () => {
    if (!newComment.trim() && !newRating) return;
    addCommentMutation.mutate({
      title: boardgame.title[0],
      rating: newRating || undefined,
      comment: newComment.trim() || undefined,
    });
  };

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate({
      title: boardgame.title[0],
    });
  };

  const handleEditComment = (comment) => {
    setNewComment(comment);
  };

  const ratingsList = boardgame.discordOrop?.ratings || [];
  const comments = ratingsList.filter((rating) => rating.comment);
  const userComment = ratingsList.find(
    (rating) => rating.userId === userId && rating.comment
  );
  const isAlreadyRated = !!userComment;

  const hasChanges =
    newComment.trim() || newRating !== getUserRating(boardgame, userId);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <FormattedMessage
                id="BoardgameCommentsModal.Title"
                values={{ title: boardgame?.title[0] }}
              />
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                {comments.map((rating, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-neutral-100 p-4 rounded-lg"
                  >
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {rating.avatar ? (
                            <Avatar
                              src={rating.avatar}
                              alt={rating.username}
                              size="sm"
                              className="mr-2"
                            />
                          ) : (
                            <UsersIcon size="2em" className="mr-2" />
                          )}
                          <span className="font-semibold">
                            {rating.username || `Utilisateur ${rating.userId}`}
                          </span>
                          <span className="text-sm text-gray-500 ml-2 italic">
                            {formatDistanceToNow(
                              new Date(rating.lastEditedAt),
                              {
                                addSuffix: true,
                                locale: fr,
                              }
                            )}
                          </span>
                        </div>
                        {rating.rating && (
                          <Image
                            src={`/${rating.rating}.webp`}
                            width={30}
                            className="ml-2"
                          />
                        )}
                      </div>
                      {rating.comment && (
                        <p className="mt-2 text-base">{rating.comment}</p>
                      )}
                      {rating.userId === userInfos?.userId && (
                        <div className="flex gap-2 mt-2">
                          <Button
                            isIconOnly
                            color="warning"
                            variant="light"
                            size="sm"
                            onPress={() => handleEditComment(rating.comment)}
                          >
                            <EditIcon size="1.5em" />
                          </Button>
                          <Button
                            isIconOnly
                            color="danger"
                            variant="light"
                            size="sm"
                            onPress={handleDeleteComment}
                          >
                            <TrashIcon size="1.5em" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {comments.length === 0 && (
                  <div className="text-center text-default-500">
                    <FormattedMessage id="BoardgameCommentsModal.NoComments" />
                    <div className="text-sm italic mt-2">
                      <FormattedMessage id="BoardgameCommentsModal.NoComments.Description" />
                    </div>
                  </div>
                )}
              </div>
              {userInfos?.isLogged ? (
                <div className="mt-4 flex flex-col gap-3">
                  <Dropdown showArrow backdrop="blur">
                    <DropdownTrigger>
                      <Button endContent={<ChevronDownIcon size="1.5em" />}>
                        {newRating ? (
                          <Image src={`/${newRating}.webp`} width={35} />
                        ) : (
                          <FormattedMessage id="BgCardUserSection.RateThisBg" />
                        )}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu onAction={(rating) => setNewRating(rating)}>
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
                  <Textarea
                    placeholder={
                      userComment
                        ? intl.formatMessage(
                            {
                              id: "BoardgameCommentsModal.UpdateCommentPlaceholder",
                            },
                            {
                              comment: userComment.comment,
                            }
                          )
                        : intl.formatMessage({
                            id: "BoardgameCommentsModal.CommentPlaceholder",
                          })
                    }
                    value={newComment}
                    onValueChange={setNewComment}
                    minRows={2}
                  />
                  {error && (
                    <p className="text-red-500 mt-1">{error.message}</p>
                  )}
                </div>
              ) : (
                <>
                  <div className="mt-4 text-center">
                    <FormattedMessage id="BoardgameCommentsModal.LoginPrompt" />
                  </div>
                  <div className="flex lg:flex-row items-center justify-center mt-2 gap-2 flex-col">
                    <GoogleLoginButton />
                    <DiscordLoginButton />
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                <FormattedMessage id="Common.Close" />
              </Button>
              {userInfos?.isLogged && (
                <Button
                  color="success"
                  onPress={handleSubmit}
                  isDisabled={!hasChanges}
                >
                  {isAlreadyRated ? (
                    <FormattedMessage id="BoardgameCommentsModal.UpdateComment" />
                  ) : (
                    <FormattedMessage id="BoardgameCommentsModal.AddComment" />
                  )}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BoardgameCommentsModal;
