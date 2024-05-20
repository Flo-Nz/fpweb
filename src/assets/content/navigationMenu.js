export const mainNav = [
  {
    id: "home",
    title: "Nav.Home",
    path: "",
  },
  {
    id: "Jeux",
    title: "Nav.Boardgames",
    path: "boardgames",
    elements: [
      {
        id: "orop-list",
        title: "Nav.Search",
        path: "boardgames/search",
        description: "Nav.Search.Description",
      },
    ],
  },
  {
    id: "myaccount",
    title: "Nav.MyInfos",
    path: "my-account",
    elements: [
      { id: "my-ratings", title: "Nav.MyRatings", path: "my-account/ratings" },
    ],
  },
];
