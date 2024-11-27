// type Props = {};

import { useEffect, useState } from "react";
import requestAuth from "./spotify-OLD/requestAuth";
import getToken from "./spotify-OLD/getToken";
import getUser from "./spotify-OLD/getUser";
import getPlaylists from "./spotify-OLD/getPlaylists";
import getPlaylist from "./spotify-OLD/getPlaylist";

const App = () => {
  const [code, setCode] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string>("");
  const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState<any[]>([]);

  async function shuffle() {
    console.log("currentPlaylistId =", currentPlaylistId);
    await getPlaylist(token, currentPlaylistId);
    const res = await getPlaylist(token, currentPlaylistId);
    if ("err" in res) {
      alert(`Error: ${res.err}`);
    } else {
      setCurrentPlaylistTracks(res.tracks.items);
    }
  }

  // FOR TESTING
  useEffect(() => {
    if (currentPlaylistTracks.length > 0) {
      console.log("songs =", currentPlaylistTracks);
    }
  }, [currentPlaylistTracks]);

  return (
    <div>
      {confirm && (
        <div>
          <button
            onClick={() => {
              shuffle();
              setConfirm(false);
            }}
          >
            YES
          </button>
          <button
            onClick={() => {
              setCurrentPlaylistId("");
              setConfirm(false);
            }}
          >
            NO
          </button>
        </div>
      )}
      <button onClick={async () => requestAuth()}>1. Request Auth Code</button>

      <button
        onClick={() => {
          const urlParams = new URLSearchParams(window.location.search);
          let urlCode = urlParams.get("code");
          if (urlCode) {
            setCode(urlCode);
          } else {
            alert("Error: No URL code");
          }
        }}
      >
        2. Get Auth Code
      </button>

      <button
        onClick={async () => {
          if (code) {
            const token = await getToken(code);
            setToken(token);
          } else {
            alert("Error: No Token");
          }
        }}
      >
        3. Get Access Token
      </button>

      <button
        onClick={() => {
          console.log("Access Token =", token);
        }}
      >
        4. Display Access Token
      </button>

      <button
        onClick={async () => {
          if (token) {
            try {
              const res = await getUser(token);
              if ("err" in res) {
                alert(`Error: ${res.err}`);
              } else {
                setUserId(res.id);
              }
            } catch (error) {}
          } else {
            alert("Error: No Token");
          }
        }}
      >
        5. Get User Id
      </button>

      <button onClick={() => console.log("UserId =", userId)}>
        6. Display User Id
      </button>

      <button
        onClick={async () => {
          if (token) {
            try {
              let tempPlaylists: any[] = [];
              let url = "";

              while (true) {
                const res = await getPlaylists(token, userId, url);
                if ("err" in res) {
                  alert(`Error: ${res.err}`);
                  break;
                } else {
                  tempPlaylists = tempPlaylists.concat(res.items);
                  console.log("next =", res.next);
                  url = res.next;
                  if (!res.next) break;
                }
              }
              tempPlaylists = tempPlaylists.filter((playlist) => playlist); // filter null values from playlists
              setPlaylists(tempPlaylists);
            } catch (error) {
              alert(`Error: ${error}`);
            }
          } else {
            alert("Error: No Token");
          }
        }}
      >
        7. Get User's Playslists
      </button>
      <div className="playlists">
        <h2>Playlists</h2>
        <ul>
          {playlists.map((playlist) => {
            return (
              <li
                key={playlist.id}
                onClick={() => {
                  setCurrentPlaylistId(playlist.id);
                  setConfirm(true);
                }}
              >
                {playlist.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
