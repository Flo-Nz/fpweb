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
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
} from "./Icons";
import { mainNav } from "../assets/content/navigationMenu";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { logoutUser } from "../lib/user";
import { capitalize } from "lodash";

const icons = {
  chevron: <ChevronDown fill="currentColor" size={16} />,
};

const NavBar = ({ userInfos }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocation = location.pathname.split("/")?.[1];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogged } = userInfos;

  return (
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
            <Image src="/logo.png" alt="logo" isZoomed width={100} className="logo" />
            <p className="font-semibold text-2xl">FIRSTPLAYER</p>
          </Link>
        </NavbarBrand>
        {userInfos.username && (
          <NavbarContent>
            Salut, {capitalize(userInfos.username)} !
          </NavbarContent>
        )}

      </NavbarContent>
      <NavbarContent
        key={"center-content"}
        variant={"underline"}
        gap={"$3xl"}
        className="hidden lg:flex"
      >
        {mainNav.map((nav) => (
          <>
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
                      className={`text-lg p-0 bg-transparent data-[hover=true]:bg-transparent text-primary ${currentLocation === nav.id ? "font-semibold" : ""
                        }`}
                      endContent={icons.chevron}
                      radius="sm"
                      variant="light"
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
                      description={elem.description}
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
                    <Link key={nav.id} itemID={nav.id} href={nav.url ?? `/${nav.path}`}>
                      <FormattedMessage id={nav.title} key={nav.title} />
                    </Link>
                  </NavbarItem>
                )}
              </>
            )}
          </>
        ))}
        {!isLogged && (
          <NavbarMenuItem
            key="login-discord"
            className="mr-4"
          >
            <Link href={process.env.DISCORD_OAUTH_URL}>
              <FormattedMessage id="Nav.DiscordLogin" />
            </Link>
          </NavbarMenuItem>
        )}
        {isLogged && (
          <NavbarItem
            key="logout-discord"
            className="mr-4"
          >
            <Link href="/" onClick={(event) => {
              event.stopPropagation();
              logoutUser();
            }}>
              <FormattedMessage id="Nav.DiscordLogout" />
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu className="pt-8">
        {mainNav.map((nav, index) => (
          <>
            {nav.elements ? (
              <>
                {nav.elements.map((elem) => (
                  <NavbarMenuItem
                    key={elem.id + index}
                    isActive={
                      currentLocation === nav.id
                    }
                  >
                    <Link key={elem.id + index} itemID={elem.id} href={`/${elem.path}`}>
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
          </>
        ))}
        {!isLogged && (
          <NavbarMenuItem
            key="login-discord"
            className="mr-4"
          >
            <Link href={process.env.DISCORD_OAUTH_URL}>
              <FormattedMessage id="Nav.DiscordLogin" />
            </Link>
          </NavbarMenuItem>
        )}
        {isLogged && (
          <NavbarMenuItem
            key="logout-discord"
            className="mr-4"
          >
            <Link href="/" onClick={(event) => {
              event.stopPropagation();
              logoutUser();
            }}>
              <FormattedMessage id="Nav.DiscordLogout" />
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
