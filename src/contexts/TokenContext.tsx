import { createContext } from "react";

const TokenContext = createContext<string | null>(null);

export { TokenContext };