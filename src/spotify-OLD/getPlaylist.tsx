interface PlaylistsApiResponse {
  tracks: {
    items: [
      {
        track: {
          uri: string;
        };
      }
    ];
  };
}

async function getPlaylist(
  token: string,
  playlist_id: string
): Promise<PlaylistsApiResponse | { err: unknown }> {
  let res;
  try {
    res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist_id}?fields=tracks.items.track%28uri%2Cname%29`,
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

export default getPlaylist;
