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
  Tooltip,
  CircularProgress,
} from "@heroui/react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { TrashIcon, UsersIcon, EditIcon, ChevronDownIcon } from "./Icons";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
  postUserRating,
  removeUserRating,
  getBoardgame,
  removeReview,
} from "../lib/api";
import { useUserInfos } from "../providers/UserInfosContext";
import { getUserRating, ratings } from "../lib/shared";
import GoogleLoginButton from "./GoogleLoginButton";
import DiscordLoginButton from "./DiscordLoginButton";
import { userCanEdit } from "../lib/user";

const BoardgameReviewsModal = ({ boardgameId, isOpen, onOpenChange }) => {
  const [newReview, setNewReview] = useState("");
  const [error, setError] = useState(null);
  const userInfos = useUserInfos();
  const { userId } = userInfos;
  const queryClient = useQueryClient();
  const intl = useIntl();
  const [newRating, setNewRating] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    sortBy: "date",
    order: "desc",
  });

  const { data: boardgame, isLoading } = useQuery({
    queryKey: ["boardgame", boardgameId, sortConfig],
    queryFn: () => getBoardgame(boardgameId, sortConfig),
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen && boardgame) {
      const currentRating = getUserRating(boardgame, userId) || null;
      setNewRating(currentRating);
    }
  }, [isOpen, boardgame, userId]);

  const addReviewMutation = useMutation({
    mutationFn: ({ title, rating, review }) =>
      postUserRating(title, rating, review),
    onSuccess: (data, variables, context) => {
      setNewReview("");
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
      queryClient.invalidateQueries({ queryKey: ["allOrops"] });
      onOpenChange(false);
    },
    onError: (err) => setError(err),
  });

  const deleteReviewMutation = useMutation({
    mutationFn: ({ title }) =>
      removeUserRating({ title, rating: "true", review: "true" }),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["searchResults"] });
      queryClient.invalidateQueries({ queryKey: ["myRatings"] });
      queryClient.invalidateQueries({ queryKey: ["allOrops"] });
      onOpenChange(false);
    },
    onError: (err) => setError(err),
  });

  const deleteScribeReviewMutation = useMutation({
    mutationFn: ({ userId, title }) => removeReview({ userId, title }),
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
    if (!newReview.trim() || !newRating) return;
    addReviewMutation.mutate({
      title: boardgame.title[0],
      rating: newRating || undefined,
      review: newReview.trim() || undefined,
    });
  };

  const handleDeleteReview = () => {
    deleteReviewMutation.mutate({
      title: boardgame.title[0],
    });
  };

  const handleScribeDeleteReview = (userId) => {
    deleteScribeReviewMutation.mutate({
      userId,
      title: boardgame.title[0],
    });
  };

  const handleEditReview = (review) => {
    setNewReview(review);
  };

  const handleSortTypeChange = (key) => {
    setSortConfig((prev) => ({
      sortBy: key,
      order: prev.order,
    }));
  };

  const handleSortOrderChange = (key) => {
    setSortConfig((prev) => ({
      ...prev,
      order: key,
    }));
  };

  const hasChanges =
    newReview.trim() && (newRating || getUserRating(boardgame, userId));

  const ratingsList = boardgame?.discordOrop?.ratings ?? [];
  const reviews = ratingsList.filter((rating) => rating.review);
  const userReview = ratingsList.find(
    (rating) => rating.userId === userId && rating.review
  );
  const isAlreadyRated = !!userReview;

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
                id="BoardgameReviewsModal.Title"
                values={{ title: boardgame?.title[0] }}
              />
            </ModalHeader>
            <ModalBody>
              {isLoading ? (
                <div className="flex justify-center">
                  <CircularProgress aria-label="Loading..." />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 justify-end">
                    <Dropdown showArrow backdrop="blur">
                      <DropdownTrigger>
                        <Button
                          size="sm"
                          endContent={<ChevronDownIcon size="1.5em" />}
                        >
                          <FormattedMessage
                            id={
                              sortConfig.sortBy === "rating"
                                ? "Common.SortByRating"
                                : "Common.SortByDate"
                            }
                          />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu onAction={handleSortTypeChange}>
                        <DropdownItem key="date">
                          <FormattedMessage id="Common.SortByDate" />
                        </DropdownItem>
                        <DropdownItem key="rating">
                          <FormattedMessage id="Common.SortByRating" />
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    <Dropdown showArrow backdrop="blur">
                      <DropdownTrigger>
                        <Button
                          size="sm"
                          endContent={<ChevronDownIcon size="1.5em" />}
                        >
                          <FormattedMessage
                            id={`Common.${
                              sortConfig.order === "desc"
                                ? "Descending"
                                : "Ascending"
                            }`}
                          />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu onAction={handleSortOrderChange}>
                        <DropdownItem key="desc">
                          <FormattedMessage id="Common.Descending" />
                        </DropdownItem>
                        <DropdownItem key="asc">
                          <FormattedMessage id="Common.Ascending" />
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  {reviews.map((rating, index) => (
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
                              {rating.username ||
                                `Utilisateur ${rating.userId}`}
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
                        {rating.review && (
                          <p className="mt-2 text-base">{rating.review}</p>
                        )}
                        <div className="flex gap-2 mt-2">
                          {rating.userId === userInfos?.userId && (
                            <Button
                              isIconOnly
                              color="warning"
                              variant="light"
                              size="sm"
                              onPress={() => handleEditReview(rating.review)}
                            >
                              <EditIcon size="1.5em" />
                            </Button>
                          )}
                          {(rating.userId === userInfos?.userId ||
                            userCanEdit(userInfos?.discordRoles)) && (
                            <Button
                              isIconOnly
                              color="danger"
                              variant="light"
                              size="sm"
                              onPress={() => {
                                if (rating.userId === userInfos?.userId) {
                                  handleDeleteReview();
                                } else {
                                  handleScribeDeleteReview(rating.userId);
                                }
                              }}
                            >
                              <TrashIcon size="1.5em" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <div className="text-center text-default-500">
                      <FormattedMessage id="BoardgameReviewsModal.NoReviews" />
                      <div className="text-sm italic mt-2">
                        <FormattedMessage id="BoardgameReviewsModal.NoReviews.Description" />
                      </div>
                    </div>
                  )}
                </div>
              )}
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
                      userReview
                        ? intl.formatMessage(
                            {
                              id: "BoardgameReviewsModal.UpdateReviewPlaceholder",
                            },
                            {
                              review: userReview.review,
                            }
                          )
                        : intl.formatMessage({
                            id: "BoardgameReviewsModal.ReviewPlaceholder",
                          })
                    }
                    value={newReview}
                    onValueChange={setNewReview}
                    minRows={2}
                  />
                  {error && (
                    <p className="text-red-500 mt-1">{error.message}</p>
                  )}
                </div>
              ) : (
                <>
                  <div className="mt-4 text-center">
                    <FormattedMessage id="BoardgameReviewsModal.LoginPrompt" />
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
              {userInfos?.isLogged && hasChanges && (
                <Button color="success" onPress={handleSubmit}>
                  {isAlreadyRated ? (
                    <FormattedMessage id="BoardgameReviewsModal.UpdateReview" />
                  ) : (
                    <FormattedMessage id="BoardgameReviewsModal.AddReview" />
                  )}
                </Button>
              )}
              {userInfos?.isLogged && !hasChanges && (
                <Tooltip
                  content={intl.formatMessage({
                    id: "BoardgameReviewsModal.RatingRequired",
                  })}
                  showArrow
                >
                  <Button color="success" variant="light">
                    {isAlreadyRated ? (
                      <FormattedMessage id="BoardgameReviewsModal.UpdateReview" />
                    ) : (
                      <FormattedMessage id="BoardgameReviewsModal.AddReview" />
                    )}
                  </Button>
                </Tooltip>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BoardgameReviewsModal;
