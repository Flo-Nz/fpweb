import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { FormattedMessage } from "react-intl";
import { footer } from "../assets/content/footer";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./Icons";

const Footer = () => {
  return (
    <footer>
      <Navbar key={"main-navbar"} className="justify-start w-full max-w-[100%]">
        <NavbarContent
          key={"center-content"}
          variant={"underline"}
          gap={"$3xl"}
          className="flex"
        >
          <div className="flex w-full justify-between items-center mt-8">
            <div className="flex">
              <NavbarItem
                key={"legal"}
                className="mr-4 self-center text-primary"
              >
                © 2024 Firstplayer.fr - All rights reserved
              </NavbarItem>
            </div>
          </div>
        </NavbarContent>
      </Navbar>
    </footer>
  );
};

export default Footer;
