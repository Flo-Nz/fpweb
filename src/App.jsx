import { Outlet, redirect, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import CookieConsent from "react-cookie-consent";
import { useIntl, FormattedMessage } from "react-intl";
import { useEffect, useState } from "react";
import { getUserApiKey, getUserInfos, isUserLogged } from "./lib/user";
import { verifyJwt } from "./lib/jwt";
import { fetchUserInfos } from "./lib/api";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const intl = useIntl();
  const [userInfos, setUserInfos] = useState({ isLogged: false, discordId: null, discordRoles: [], apikey: null })
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = location
  console.log('pathname', pathname)
  const userJwt = searchParams.get('jwt');

  useEffect(() => {
    const initUserInfos = async () => {
      if (userJwt) {
        await verifyJwt(userJwt);
      }
      const apikey = await getUserApiKey();
      if (apikey) {
        await fetchUserInfos();
        setUserInfos(await getUserInfos());
        navigate(pathname);
      }
    }
    if (!userInfos.isLogged) {
      initUserInfos();
    }
  }, [])

  console.log('is logged in App.jsx', userInfos)

  return (
    <>
      <NavBar userInfos={userInfos} />
      <Layout>{location?.pathname === "/" ? <Home userInfos={userInfos} /> : <Outlet userInfos={userInfos} />}</Layout>
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
    </>
  );
};

export default App;
