import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { GoogleIcon } from "./Icons";
import { FormattedMessage, useIntl } from "react-intl";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = ({ size }) => {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      const response = await axios.post("http://localhost:3000/google/login", {
        code: codeResponse.code,
      });
      if (response?.data) {
        navigate(`/?jwt=${response.data.jwt}`);
        window.location.reload();
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Button
      startContent={<GoogleIcon size={size} />}
      onPress={() => googleLogin()}
    >
      <FormattedMessage id="Nav.GoogleLogin" />
    </Button>
  );
};

export default GoogleLoginButton;
