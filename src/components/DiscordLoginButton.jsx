import { Button, Link } from "@heroui/react";
import { DiscordIcon } from "./Icons";
import { FormattedMessage } from "react-intl";

const DiscordLoginButton = ({ size }) => (
  <Link href={process.env.DISCORD_OAUTH_URL}>
    <Button
      startContent={<DiscordIcon size={size} />}
      className="font-semibold text-gray-600"
    >
      <FormattedMessage id="Nav.DiscordLogin" />
    </Button>
  </Link>
);

export default DiscordLoginButton;
