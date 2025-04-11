import {
  Outlet,
  useLocation,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import CookieConsent from "react-cookie-consent";
import { useIntl, FormattedMessage } from "react-intl";
import { useEffect, useState } from "react";
import { getUserApiKey, getUserInfos } from "./lib/user";
import { verifyJwt } from "./lib/jwt";
import { fetchUserInfos } from "./lib/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserInfosProvider } from "./providers/UserInfosContext";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const intl = useIntl();
  const [userInfos, setUserInfos] = useState({
    isLogged: false,
    userId: null,
    discordRoles: [],
    apikey: null,
    avatar: null,
    username: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const userJwt = searchParams.get("jwt");

  useEffect(() => {
    const initUserInfos = async () => {
      if (userJwt) {
        await verifyJwt(userJwt);
      }
      const apikey = await getUserApiKey();
      if (apikey) {
        await fetchUserInfos();
        setUserInfos(await getUserInfos());
        setSearchParams("");
      }
    };

    if (!userInfos.isLogged) {
      initUserInfos();
    }
  }, [userInfos.isLogged]);

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_ID_CLIENT}>
      <QueryClientProvider client={queryClient}>
        <UserInfosProvider userInfos={userInfos}>
          <NavBar />
          <Layout>{location?.pathname === "/" ? <Home /> : <Outlet />}</Layout>
          <Footer />
          <CookieConsent
            location="bottom"
            buttonText={intl.formatMessage({ id: "Cookies.Accept" })}
            declineButtonText={intl.formatMessage({ id: "Cookies.Decline" })}
            style={{ background: "#2B373B" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            declineButtonStyle={{ fontSize: "13px" }}
            expires={150}
            cookieName="CookieConsent"
            visible={"byCookieValue"}
            enableDeclineButton
          >
            <FormattedMessage id="Cookies.Text" />
          </CookieConsent>
        </UserInfosProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
