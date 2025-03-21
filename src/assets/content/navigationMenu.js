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
      {
        id: "orop-top-asked",
        title: "Nav.Top.Asked",
        path: "boardgames/top/asked",
        description: "Nav.Top.Asked.Description",
      },
    ],
  },
  {
    id: "myaccount",
    title: "Nav.MyInfos",
    path: "my-account",
    elements: [
      { id: "my-ratings", title: "Nav.MyRatings", path: "my-account/ratings" },
      {
        id: "boardgames-list",
        title: "Nav.BoardgamesList",
        path: "boardgames/list",
        scribeOnly: true,
      },
    ],
  },
];
