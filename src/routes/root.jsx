import App from "../App";
import { IntlProvider } from "react-intl";
import translations from "../assets/translations.json";

const Root = () => {
  return (
    <IntlProvider locale={"fr"} messages={translations["fr"]}>
      <App />
    </IntlProvider>
  );
};

export default Root;
