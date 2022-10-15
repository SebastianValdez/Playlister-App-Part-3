import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import { useHistory } from "react-router-dom";

function EditSongModal() {
  const { store } = useContext(GlobalStoreContext);
  const history = useHistory();

  function handleEditSong() {
    const oldSong = {
      title: store.song.title,
      artist: store.song.artist,
      youTubeId: store.song.youTubeId,
    };
    const song = {
      title: document.getElementById("edit-modal-title-input").value,
      artist: document.getElementById("edit-modal-artist-input").value,
      youTubeId: document.getElementById("edit-modal-id-input").value,
    };
    store.editSongTransaction(store.index, oldSong, song);
    let modal = document.getElementById("edit-song-modal");
    modal.classList.remove("is-visible");
  }

  function handleCloseEditModal() {
    let modal = document.getElementById("edit-song-modal");
    modal.classList.remove("is-visible");
    store.closeModal();
  }

  return (
    <div class="modal" id="edit-song-modal" data-animation="slideInOutLeft">
      <div class="modal-root" id="verify-delete-list-root">
        <div class="modal-north">Edit Song</div>
        <div class="modal-center">
          <div class="modal-center-content">
            <div id="edit-song-inputs">
              <label for="edit-modal-title-input">Title:</label>
              <input type="text" id="edit-modal-title-input" />

              <label for="edit-modal-artist-input">Artist:</label>
              <input type="text" id="edit-modal-artist-input" />

              <label for="edit-modal-id-input">YouTube ID:</label>
              <input type="text" id="edit-modal-id-input" />
            </div>
          </div>
        </div>
        <div class="modal-south">
          <input
            type="button"
            id="edit-song-confirm-button"
            class="modal-button"
            value="Confirm"
            onClick={handleEditSong}
          />
          <input
            type="button"
            id="edit-song-cancel-button"
            class="modal-button"
            value="Cancel"
            onClick={handleCloseEditModal}
          />
        </div>
      </div>
    </div>
  );
}

export default EditSongModal;
