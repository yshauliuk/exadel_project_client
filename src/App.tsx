import { useState } from "react";
import { Unauthorized, Authorized } from "./components";
import { TokenContext } from "./contexts/TokenContext";

const App: React.FC = () => {
  const [token, setToken] = useState<string>("");

  return (
    <TokenContext.Provider value={token}>
      {token ? <Authorized /> : <Unauthorized setToken={setToken} />}
    </TokenContext.Provider>
  );
};

export default App;
