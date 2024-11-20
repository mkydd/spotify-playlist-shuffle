import { generateRandomString, alphabet } from "oslo/crypto";
import queryString from "query-string";

function requestAuth() {
  const state = generateRandomString(1, alphabet("a-z", "0-9"));
  const scope =
    "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public";
  window.location.href =
    "https://example.com/1234" +
    queryString.stringify({
      response_type: "code",
      client_id: import.meta.env.VITE_CLIENT_ID,
      scope: scope,
      redirect_uri: "http://localhost:5173/callback",
      state: state,
    });
}

export default requestAuth;
