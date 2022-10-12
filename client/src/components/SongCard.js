import React, { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";

function SongCard(props) {
  const { store } = useContext(GlobalStoreContext);

  const { song, index } = props;
  let cardClass = "list-card unselected-list-card";

  function handleDeleteSong(event) {
    event.stopPropagation();
    store.markPlaylist(store.currentList._id); // ! We now know which playlist to delete from store, use this in the modal
    store.markSongForEditOrDelete(song, index); // ! We know which song to delete from the playlist
    let modal = document.getElementById("delete-song-modal");
    modal.classList.add("is-visible");
  }

  function handleEditSong(event) {
    event.stopPropagation();
    store.markPlaylist(store.currentList._id); // ! We now know which playlist to delete from store, use this in the modal
    store.markSongForEditOrDelete(song, index); // ! We know which song to delete from the playlist
    let modal = document.getElementById("edit-song-modal");
    modal.classList.add("is-visible");
  }

  return (
    <div
      key={index}
      id={"song-" + index + "-card"}
      className={cardClass}
      onDoubleClick={handleEditSong}
    >
      {index + 1}.
      <a
        id={"song-" + index + "-link"}
        className="song-link"
        href={"https://www.youtube.com/watch?v=" + song.youTubeId}
      >
        {song.title} by {song.artist}
      </a>
      <input
        type="button"
        id={"remove-song-" + index}
        className="list-card-button"
        value={"\u2715"}
        onClick={handleDeleteSong}
      />
    </div>
  );
}

export default SongCard;
