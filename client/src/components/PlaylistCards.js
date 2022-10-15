import { useCallback, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SongCard from "./SongCard.js";
import { GlobalStoreContext } from "../store";
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
  const { store } = useContext(GlobalStoreContext);
  store.history = useHistory();

  useEffect(() => {
    document.addEventListener("keydown", handleCtrlZ);
    document.addEventListener("keydown", handleCtrlY);

    return () => {
      document.removeEventListener("keydown", handleCtrlZ);
      document.removeEventListener("keydown", handleCtrlY);
    };
  }, [store]);

  const handleCtrlZ = useCallback((event) => {
    const undoButton = document.getElementById("undo-button");
    if (event.ctrlKey && (event.key === "z" || event.key === "Z"))
      if (undoButton && undoButton.className == "playlister-button") {
        undoButton.click();
      }
  }, []);

  const handleCtrlY = useCallback((event) => {
    const redoButton = document.getElementById("redo-button");
    if (event.ctrlKey && (event.key === "y" || event.key === "Y"))
      if (redoButton && redoButton.className == "playlister-button")
        redoButton.click();
  }, []);

  return (
    <div id="playlist-cards">
      {store.currentList.songs.map((song, index) => (
        <SongCard
          id={"playlist-song-" + index}
          key={"playlist-song-" + index}
          index={index}
          song={song}
        />
      ))}
    </div>
  );
}

export default PlaylistCards;
