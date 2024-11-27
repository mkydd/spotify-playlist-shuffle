interface UserApiResponse {
  id: string;
}

async function getUser(
  token: string
): Promise<UserApiResponse | { err: unknown }> {
  let res;
  try {
    res = await fetch("https://api.spotify.com/v1/me", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    return { err };
  }
}

export default getUser;
