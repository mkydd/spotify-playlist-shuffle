async function getToken() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");

  const authUrl = new URL("https://accounts.spotify.com/api/token");
  const redirectUri = "http://localhost:5173";
  let codeVerifier = localStorage.getItem("code_verifier");

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_CLIENT_ID,
      grant_type: "authorization_code",
      code: code ?? "",
      redirect_uri: redirectUri,
      code_verifier: codeVerifier ?? "",
    }),
  };

  const body = await fetch(authUrl, payload);
  const response = await body.json();

  localStorage.setItem("access_token", response.access_token);
  updateURL();

  return response.access_token;
}

function updateURL() {
  let url = window.location.href;

  let urlObject = new URL(url);
  urlObject.search = "";

  history.replaceState(null, "", urlObject.toString());
}

export default getToken;
