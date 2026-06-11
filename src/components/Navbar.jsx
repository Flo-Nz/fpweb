import { Link, useLocation, useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { canEdit } from "../lib/auth";
import {
  DbIcon,
  MyRatingsIcon,
  DiscordIcon,
  CheckIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  GoogleIcon,
} from "./icons/Icons";
import ThemeToggle from "./ThemeToggle";

const SocialLinks = () => (
  <div className="hidden items-center gap-1 md:flex">
    <a
      href="https://www.facebook.com/FirstPlayerFR/"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg p-1.5 opacity-60 transition-opacity hover:opacity-100"
      title="Facebook"
    >
      <FacebookIcon size="22" />
    </a>
    <a
      href="https://www.instagram.com/firstplayerfr/"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg p-1.5 opacity-60 transition-opacity hover:opacity-100"
      title="Instagram"
    >
      <InstagramIcon size="22" />
    </a>
    <a
      href="https://www.youtube.com/@FirstPlayerFr"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg p-1.5 opacity-60 transition-opacity hover:opacity-100"
      title="YouTube"
    >
      <YoutubeIcon size="22" />
    </a>
    <a
      href="https://discord.gg/numWSwhHkW"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg p-1.5 opacity-60 transition-opacity hover:opacity-100"
      title="Discord"
    >
      <DiscordIcon size="22" />
    </a>
  </div>
);

const Navbar = () => {
  const intl = useIntl();
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      const response = await axios.post(
        `${process.env.API_BASE_URL}/google/login`,
        { code: codeResponse.code }
      );
      if (response?.data?.jwt) {
        navigate(`/?jwt=${response.data.jwt}`);
        window.location.reload();
      }
    },
    onError: (error) => console.error("[Google Login]", error),
  });

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand + social */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img src="/logo.png" alt="First Player" className="h-8 w-8" />
            <span className="text-xl font-bold text-fp-purple">First Player</span>
          </Link>
          <SocialLinks />
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors ${
              isActive("/")
                ? "bg-content2 text-foreground"
                : "text-foreground/50 hover:bg-content2 hover:text-foreground"
            }`}
          >
            <DbIcon size="20" />
            <span className="hidden sm:inline">
              {intl.formatMessage({ id: "nav.search" })}
            </span>
          </Link>
          {user.isLogged && (
            <Link
              to="/my-ratings"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors ${
                isActive("/my-ratings")
                  ? "bg-content2 text-foreground"
                  : "text-foreground/50 hover:bg-content2 hover:text-foreground"
              }`}
            >
              <MyRatingsIcon size="20" />
              <span className="hidden sm:inline">
                {intl.formatMessage({ id: "nav.myRatings" })}
              </span>
            </Link>
          )}
          {user.isLogged && canEdit(user.discordRoles) && (
            <Link
              to="/pending"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors ${
                isActive("/pending")
                  ? "bg-content2 text-foreground"
                  : "text-foreground/50 hover:bg-content2 hover:text-foreground"
              }`}
            >
              <CheckIcon size="20" />
              <span className="hidden sm:inline">Validation</span>
            </Link>
          )}
        </div>

        {/* Right: theme + auth */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user.isLogged ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-medium text-foreground/70 sm:inline">
                {user.username}
              </span>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="h-8 w-8 rounded-full border-2 border-divider object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-content2 text-xs font-bold text-foreground/70">
                  {user.username?.charAt(0)?.toUpperCase() || "?"}
                </div>
              )}
              <button
                onClick={logout}
                className="cursor-pointer rounded-lg px-2 py-1 text-xs text-foreground/50 transition-colors hover:bg-danger/10 hover:text-danger"
              >
                {intl.formatMessage({ id: "nav.logout" })}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Discord login */}
              <a
                href={process.env.DISCORD_OAUTH_URL}
                className="flex items-center gap-1.5 rounded-lg bg-fp-purple px-3 py-2 text-xs font-medium text-white no-underline transition-opacity hover:opacity-90"
              >
                <DiscordIcon size="16" />
                <span className="hidden sm:inline">Discord</span>
              </a>
              {/* Google login */}
              <button
                onClick={() => googleLogin()}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-divider bg-content1 px-3 py-2 text-xs font-medium text-foreground/70 transition-colors hover:bg-content2"
              >
                <GoogleIcon size="16" />
                <span className="hidden sm:inline">Google</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
