import { useState } from "react";
import { Unauthorized, Authorized } from "./components";

const App: React.FC = () => {
  const [token, setToken] = useState<String | null>(null);

  return <>{token ? <Authorized /> : <Unauthorized setToken={setToken} />}</>;
};

export default App;
