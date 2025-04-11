import { find } from "lodash";

export const getUserRating = (boardgame, userId) => {
  if (!userId) {
    return null;
  }
  const userRating = find(
    boardgame.discordOrop?.ratings,
    (elem) => elem.userId === userId
  );
  return userRating?.rating;
};

export const ratings = ["1", "2", "3", "4", "5"];
