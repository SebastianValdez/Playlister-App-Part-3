import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import { useHistory } from "react-router-dom";

function EditSongModal() {
  const { store } = useContext(GlobalStoreContext);
  const history = useHistory();

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
          />
          <input
            type="button"
            id="edit-song-cancel-button"
            class="modal-button"
            value="Cancel"
          />
        </div>
      </div>
    </div>
  );
}

export default EditSongModal;
