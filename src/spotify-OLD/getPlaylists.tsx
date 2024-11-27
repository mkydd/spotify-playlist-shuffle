interface PlaylistsApiResponse {
  items: any[];
  offset: number;
  next: string;
}

async function getPlaylists(
  token: string,
  userId: string,
  url: string
): Promise<PlaylistsApiResponse | { err: unknown }> {
  let res;
  try {
    res = await fetch(
      url || `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    return { err };
  }
}

export default getPlaylists;
