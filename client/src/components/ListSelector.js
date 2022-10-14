import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ListCard from "./ListCard.js";
import { GlobalStoreContext } from "../store";
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
  const { store } = useContext(GlobalStoreContext);
  store.history = useHistory();

  useEffect(() => {
    store.loadIdNamePairs();

    // ! Disables all the buttons upon first loading (except add playlist)
    document.getElementById("add-song-button").disabled = true;
    document.getElementById("undo-button").disabled = true;
    document.getElementById("redo-button").disabled = true;
    document.getElementById("close-button").disabled = true;

    document.addEventListener("keydown", (event) => {
      if (!this.state.modalIsOpen) {
        if (event.ctrlKey && (event.key === "z" || event.key === "Z")) {
          this.undo();
        } else if (event.ctrlKey && (event.key === "y" || event.key === "Y")) {
          this.redo();
        }
      }
    });
  }, []);

  function handleCreateNewList() {
    store.createNewList();
  }
  let listCard = "";
  if (store) {
    listCard = store.idNamePairs.map((pair) => (
      <ListCard key={pair._id} idNamePair={pair} selected={false} />
    ));
  }
  return (
    <div id="playlist-selector">
      <div id="list-selector-list">
        <div id="playlist-selector-heading">
          <input
            type="button"
            id="add-list-button"
            onClick={handleCreateNewList}
            className="playlister-button"
            value="+"
          />
          Your Lists
        </div>{" "}
        {listCard}
      </div>
    </div>
  );
};

export default ListSelector;
