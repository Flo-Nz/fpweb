import { Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Layout from "./components/Layout";
import SearchPage from "./pages/SearchPage";
import BoardgamePage from "./pages/BoardgamePage";
import MyRatingsPage from "./pages/MyRatingsPage";
import PendingPage from "./pages/PendingPage";

const App = () => {
  return (
    <UserProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/boardgame/:id" element={<BoardgamePage />} />
          <Route path="/my-ratings" element={<MyRatingsPage />} />
          <Route path="/pending" element={<PendingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </UserProvider>
  );
};

export default App;
