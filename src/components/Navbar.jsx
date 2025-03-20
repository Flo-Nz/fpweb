import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  DiscordIcon,
  DiscordOutlineIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "./Icons";
import { mainNav } from "../assets/content/navigationMenu";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { logoutUser } from "../lib/user";
import GoogleLoginButton from "./GoogleLoginButton";
import DiscordLoginButton from "./DiscordLoginButton";

const icons = {
  chevron: <ChevronDownIcon size={16} />,
};

const NavBar = ({ userInfos }) => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocation = location.pathname.split("/")?.[1];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogged } = userInfos;

  return (
    <>
      <Navbar
        key={"main-navbar"}
        onMenuOpenChange={setIsMenuOpen}
        className="justify-start w-full max-w-[100%]"
      >
        <NavbarContent className="text-white">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden"
          />
          <NavbarBrand key={"navbar-brand"}>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                isZoomed
                width={100}
                className="logo hidden md:flex lg:flex"
              />
              <h1 className="font-semibold text-2xl ml-4 lg:ml-0">
                FIRSTPLAYER
              </h1>
            </Link>
          </NavbarBrand>
          <NavbarContent
            key={"center-content"}
            variant={"underline"}
            gap={"$3xl"}
            className="flex"
          >
            <div className="flex w-full justify-between items-center">
              <div className="hidden lg:flex">
                <div className="flex-col text-center mt-2 lg:flex lg:flex-row lg:mt-0">
                  <Link
                    href="https://www.facebook.com/FirstPlayerFR/"
                    target="_blank"
                  >
                    <Button
                      isIconOnly
                      variant="bordered"
                      className="border-transparent"
                    >
                      <FacebookIcon />
                    </Button>
                  </Link>
                  <Link
                    href="https://www.instagram.com/firstplayerfr/"
                    target="_blank"
                    className="ml-2"
                  >
                    <Button
                      isIconOnly
                      variant="bordered"
                      className="border-transparent"
                    >
                      <InstagramIcon />
                    </Button>
                  </Link>
                  <Link
                    href="https://www.youtube.com/@FirstPlayerFr"
                    target="_blank"
                    className="ml-2"
                  >
                    <Button
                      isIconOnly
                      variant="bordered"
                      className="border-transparent"
                    >
                      <YoutubeIcon />
                    </Button>
                  </Link>
                  <Link
                    href="https://discord.gg/numWSwhHkW"
                    target="_blank"
                    className="ml-2"
                  >
                    <Button
                      isIconOnly
                      variant="bordered"
                      className="border-transparent"
                    >
                      <DiscordIcon />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </NavbarContent>
        </NavbarContent>
        <NavbarContent
          key={"center-content"}
          variant={"underline"}
          gap={"$3xl"}
          className="hidden lg:flex"
        >
          {mainNav.map((nav) => (
            <div key={nav.id}>
              {nav.elements ? (
                <Dropdown key={nav.id}>
                  <NavbarItem
                    key={nav.id}
                    isActive={currentLocation === nav.id}
                    className="mr-4"
                  >
                    <DropdownTrigger key={nav.id}>
                      <Button
                        disableRipple
                        className={`text-lg font-semibold`}
                        endContent={icons.chevron}
                        radius="lg"
                        key={nav.id}
                      >
                        <FormattedMessage id={nav.title} key={nav.title} />
                      </Button>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    aria-label="Boardgames"
                    className="w-[340px] bg-neutral-200"
                    itemClasses={{
                      base: "gap-4",
                    }}
                    key={nav.id}
                  >
                    {nav.elements.map((elem) => (
                      <DropdownItem
                        key={elem.id}
                        description={
                          elem?.description
                            ? intl.formatMessage({
                                id: elem.description,
                              })
                            : ""
                        }
                        startContent={icons[elem.icon]}
                        onPress={() => navigate(elem.path)}
                      >
                        <FormattedMessage id={elem.title} key={elem.title} />
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <>
                  {nav.id !== "home" && (
                    <NavbarItem
                      key={nav.id}
                      isActive={currentLocation === nav.id}
                      className="mr-4"
                    >
                      <Link
                        key={nav.id}
                        itemID={nav.id}
                        href={nav.url ?? `/${nav.path}`}
                      >
                        <FormattedMessage id={nav.title} key={nav.title} />
                      </Link>
                    </NavbarItem>
                  )}
                </>
              )}
            </div>
          ))}
          {!isLogged && (
            <>
              <NavbarMenuItem key="login-discord" className="mr-4">
                <DiscordLoginButton size={"2em"} />
              </NavbarMenuItem>
              <NavbarMenuItem key="login-google" className="mr-4">
                <GoogleLoginButton size={"2em"} />
              </NavbarMenuItem>
            </>
          )}
          {isLogged && (
            <NavbarItem key="logout-discord" className="mr-4">
              <Link href="/">
                <Button
                  className="border-solid border-2 bg-slate-200 border-indigo-500 text-indigo-500 font-semibold"
                  onPress={() => {
                    logoutUser();
                  }}
                >
                  <FormattedMessage id="Nav.DiscordLogout" />
                </Button>
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>
        <NavbarMenu className="pt-8">
          {mainNav.map((nav, index) => (
            <div key={nav.id}>
              {nav.elements ? (
                <>
                  {nav.elements.map((elem) => (
                    <NavbarMenuItem
                      key={elem.id + index}
                      isActive={currentLocation === nav.id}
                    >
                      <Link
                        key={elem.id + index}
                        itemID={elem.id}
                        href={`/${elem.path}`}
                      >
                        <FormattedMessage id={elem.title} key={elem.title} />
                      </Link>
                    </NavbarMenuItem>
                  ))}
                </>
              ) : (
                <NavbarMenuItem
                  key={nav.id + index}
                  isActive={currentLocation === nav.id}
                  className="mr-4"
                >
                  <Link key={nav.id} itemID={nav.id} href={`/${nav.path}`}>
                    <FormattedMessage id={nav.title} key={nav.title} />
                  </Link>
                </NavbarMenuItem>
              )}
            </div>
          ))}
          {!isLogged && (
            <>
              <NavbarMenuItem key="login-discord" className="mr-4">
                <DiscordLoginButton size={"1.5em"} />
              </NavbarMenuItem>
              <NavbarMenuItem key="login-google" className="mr-4">
                <GoogleLoginButton size={"1.5em"} />
              </NavbarMenuItem>
            </>
          )}
          {isLogged && (
            <NavbarMenuItem key="logout-discord" className="mr-4">
              <Link
                href="/"
                onPress={(event) => {
                  logoutUser();
                }}
              >
                <FormattedMessage id="Nav.DiscordLogout" />
              </Link>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </Navbar>
      <div className="lg:hidden">
        <div className="flex flex-row justify-center lg:hidden">
          <Link href="https://www.facebook.com/FirstPlayerFR/" target="_blank">
            <Button color="primary" isIconOnly className="font-color-white">
              <FacebookIcon fill="black" size={32} />
            </Button>
          </Link>
          <Link
            href="https://www.instagram.com/firstplayerfr/"
            target="_blank"
            className="ml-1"
          >
            <Button color="primary" isIconOnly className="font-color-white">
              <InstagramIcon fill="black" size={32} />
            </Button>
          </Link>
          <Link
            href="https://www.youtube.com/@FirstPlayerFr"
            target="_blank"
            className="ml-1"
          >
            <Button color="primary" isIconOnly className="font-color-white">
              <YoutubeIcon fill="black" size={32} />
            </Button>
          </Link>
          <Link
            href="https://discord.gg/numWSwhHkW"
            target="_blank"
            className="ml-1"
          >
            <Button color="primary" isIconOnly className="font-color-white">
              <DiscordOutlineIcon fill="black" size={32} />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
