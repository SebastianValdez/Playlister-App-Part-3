import React, { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";

function SongCard(props) {
  const { store } = useContext(GlobalStoreContext);

  const { song, index } = props;
  let cardClass = "list-card unselected-list-card";

  // ! Move Song Start
  function handleDragStart(event) {
    event.dataTransfer.setData("song", event.target.id);
  }
  function handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  function handleDragEnter(event) {
    event.preventDefault();
  }
  function handleDragLeave(event) {
    event.preventDefault();
  }
  function handleDrop(event) {
    event.preventDefault();
    let target = event.target;
    let targetId = target.id;
    targetId = targetId.substring(
      target.id.indexOf("-") + 1,
      target.id.indexOf("-") + 2
    );
    let sourceId = event.dataTransfer.getData("song");
    sourceId = sourceId.substring(
      sourceId.indexOf("-") + 1,
      sourceId.indexOf("-") + 2 // ! This is wrong?
    );

    // ASK THE MODEL TO MOVE THE DATA
    store.moveSongTransaction(parseInt(sourceId), parseInt(targetId));
  }
  // ! Move Song End

  function handleDeleteSong(event) {
    event.stopPropagation();
    store.markPlaylist(store.currentList._id); // ! We now know which playlist to delete from store, use this in the modal
    store.markSongForEditOrDelete(song, index); // ! We know which song to delete from the playlist

    let span = document.getElementById("delete-song-span");
    span.innerText = song.title;

    let modal = document.getElementById("delete-song-modal");
    modal.classList.add("is-visible");

    document.getElementById("add-song-button").disabled = true;
    document.getElementById("undo-button").disabled = true;
    document.getElementById("redo-button").disabled = true;
    document.getElementById("close-button").disabled = true;
  }

  function handleEditSong(event) {
    event.stopPropagation();
    store.markPlaylist(store.currentList._id); // ! We now know which playlist to delete from store, use this in the modal
    store.markSongForEditOrDelete(song, index); // ! We know which song to delete from the playlist

    document.getElementById("edit-modal-title-input").value = song.title;
    document.getElementById("edit-modal-artist-input").value = song.artist;
    document.getElementById("edit-modal-id-input").value = song.youTubeId;

    let modal = document.getElementById("edit-song-modal");
    modal.classList.add("is-visible");

    document.getElementById("add-song-button").disabled = true;
    document.getElementById("undo-button").disabled = true;
    document.getElementById("redo-button").disabled = true;
    document.getElementById("close-button").disabled = true;
  }

  return (
    <div
      key={index}
      id={"song-" + index + "-card"}
      className={cardClass}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      draggable="true"
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
