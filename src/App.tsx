import { useEffect, useState } from "react";
import getToken from "./spotify/getToken";
import requestAuth from "./spotify/requestAuth";

type Props = {};

const App = (props: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const fetchToken = async () => {
      setToken(await getToken());
    };

    if (code && !localStorage.getItem("access_token")) {
      fetchToken();
    }
  }, []);

  return (
    <div>
      <button
        onClick={async () => {
          await requestAuth(); // check if token in local storage
        }}
      >
        Auth
      </button>
    </div>
  );
};

export default App;
