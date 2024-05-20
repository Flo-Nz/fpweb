import { Button, Link } from "@nextui-org/react";
import { DiscordIcon } from "./Icons";
import { FormattedMessage } from "react-intl";

const DiscordLoginButton = () => (
  <Link href={process.env.DISCORD_OAUTH_URL}>
    <Button
      startContent={<DiscordIcon fill="white" />}
      className="bg-indigo-500 text-primary"
    >
      <FormattedMessage id="Nav.DiscordLogin" />
    </Button>
  </Link>
);

export default DiscordLoginButton;
