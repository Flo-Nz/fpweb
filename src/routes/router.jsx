import { Navigate, createBrowserRouter } from "react-router-dom";
import Root from "./root";
import ErrorPage from "../pages/Error";
import Legal from "../pages/Legal";
import SearchBoardgames from "../pages/SearchBoardgames";
import MyRatings from "../pages/MyRatings";
import TopAskedOrop from "../pages/TopAskedOrop";
import BoardgamesList from "../pages/BoardgamesList";
import BoardgamesValidationList from "../pages/BoardgamesValidationList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/boardgames",
        element: <Navigate to={"/boardgames/search"} />,
      },
      { path: "/boardgames/search", element: <SearchBoardgames /> },
      { path: "/boardgames/top/asked", element: <TopAskedOrop /> },
      { path: "/my-account/ratings", element: <MyRatings /> },
      {
        path: "/legal",
        element: <Legal />,
      },
      { path: "/boardgames/list", element: <BoardgamesList /> },
      {
        path: "/boardgames/pending/list",
        element: <BoardgamesValidationList />,
      },
    ],
  },
]);

export default router;
