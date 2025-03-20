import { Navbar, NavbarContent, NavbarItem } from "@heroui/react";
import { CopyrightIcon } from "./Icons";

const Footer = () => {
  return (
    <footer className="text-white flex flex-row items-center gap-2">
      <CopyrightIcon size="2em" /> Firstplayer.fr - all rights reserved
    </footer>
  );
};

export default Footer;
