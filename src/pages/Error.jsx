import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);
  return (
    <Card>
      <CardHeader>OOPS !</CardHeader>
      <CardBody>
        <p>Petit problème...</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Button onPress={() => navigate("/")}>
          Revenir à la page d'accueil
        </Button>
      </CardBody>
    </Card>
  );
};

export default ErrorPage;
