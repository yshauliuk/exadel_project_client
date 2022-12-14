import { useContext } from "react";
import { TokenContext } from "../../contexts/TokenContext";
import { Header } from "../index";

export const Authorized: React.FC = () => {
  const token = useContext(TokenContext);

  return <Header />;
};
