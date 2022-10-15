import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import { useHistory } from "react-router-dom";

function DeleteSongModal() {
  const { store } = useContext(GlobalStoreContext);
  const history = useHistory();

  function handleDeleteSong() {
    store.deleteSongTransaction(store.song, store.index);
    let modal = document.getElementById("delete-song-modal");
    modal.classList.remove("is-visible");
    store.closeModal();
  }

  function handleCloseDeleteSongModal() {
    let modal = document.getElementById("delete-song-modal");
    modal.classList.remove("is-visible");
    store.closeModal();
  }

  return (
    <div class="modal" id="delete-song-modal" data-animation="slideInOutLeft">
      <div class="modal-root" id="verify-delete-song-root">
        <div class="modal-north">Remove song?</div>
        <div class="modal-center">
          <div class="modal-center-content">
            Are you sure you wish to permanently remove{" "}
            <span id="delete-song-span"></span> from the playlist?
          </div>
        </div>
        <div class="modal-south">
          <input
            type="button"
            id="delete-song-confirm-button"
            class="modal-button"
            value="Confirm"
            onClick={handleDeleteSong}
          />
          <input
            type="button"
            id="delete-song-cancel-button"
            class="modal-button"
            value="Cancel"
            onClick={handleCloseDeleteSongModal}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteSongModal;
