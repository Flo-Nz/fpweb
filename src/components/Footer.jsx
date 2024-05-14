import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { FormattedMessage } from "react-intl";
import { footer } from "../assets/content/footer";
import { FacebookIcon, InstagramIcon } from "./Icons";

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
            <div className="hidden lg:flex">
              <NavbarItem key={"legal"} className="mr-4 self-center">
                © 2023 Psukhê.fr - All rights reserved
              </NavbarItem>
              <div className="flex-col text-center mt-2 lg:flex lg:flex-row lg:mt-0">
                <Link
                  href="https://www.facebook.com/profile.php?id=61553083716472"
                  target="_blank"
                >
                  <Button
                    color="secondary"
                    isIconOnly
                    className="font-color-white"
                  >
                    <FacebookIcon fill="white" size={32} />
                  </Button>
                </Link>
                <Link
                  href="https://www.instagram.com/psukhe.mm/"
                  target="_blank"
                  className="ml-2"
                >
                  <Button
                    color="secondary"
                    isIconOnly
                    className="font-color-white"
                  >
                    <InstagramIcon fill="white" size={32} />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col text-small lg:hidden">
              <span>© 2023 Psukhê.fr</span>
              <span>All rights reserved</span>
            </div>
            <div className="flex flex-col lg:hidden">
              <div className="flex-col text-center mt-2">
                <Link
                  href="https://www.facebook.com/profile.php?id=61553083716472"
                  target="_blank"
                >
                  <Button
                    color="secondary"
                    isIconOnly
                    className="font-color-white"
                  >
                    <FacebookIcon fill="white" size={32} />
                  </Button>
                </Link>
                <Link
                  href="https://www.instagram.com/psukhe.mm/"
                  target="_blank"
                >
                  <Button
                    color="secondary"
                    isIconOnly
                    className="font-color-white"
                  >
                    <InstagramIcon fill="white" size={32} />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              {footer.map((elem) => (
                <NavbarItem key={elem.id} className="mr-4 ">
                  <Link key={elem.id} itemID={elem.id} href={`/${elem.path}`}>
                    <FormattedMessage id={elem.title} />
                  </Link>
                </NavbarItem>
              ))}
            </div>
          </div>
        </NavbarContent>
      </Navbar>
    </footer>
  );
};

export default Footer;
