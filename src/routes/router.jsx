import { Navigate, createBrowserRouter } from "react-router-dom";
import Root from "./root";
import ErrorPage from "../pages/Error";
import Legal from "../pages/Legal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/boardgames",
        element: <Navigate to={"/boardgames/orop"} />,
      },
      {
        path: "/legal",
        element: <Legal />,
      },
    ],
  },
]);

export default router;
