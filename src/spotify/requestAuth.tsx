import { generateRandomString, alphabet } from "oslo/crypto";

async function requestAuth() {
  if (localStorage.getItem("access_token")) {
    alert("REMOVE FOR PRODUCTION\nAlready have token!");
    return localStorage.getItem("access_token");
  }

  const codeVerifier = generateRandomString(64, alphabet("A-Z", "a-z", "0-9"));
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const scope =
    "playlist-read-private playlist-modify-private playlist-modify-public";
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  const redirectUri = "http://localhost:5173";

  window.localStorage.setItem("code_verifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBufferLike) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export default requestAuth;
