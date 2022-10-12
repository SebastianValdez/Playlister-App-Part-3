import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import { useHistory } from "react-router-dom";

function DeleteSongModal() {
  const { store } = useContext(GlobalStoreContext);
  const history = useHistory();

  return (
    <div class="modal" id="delete-song-modal" data-animation="slideInOutLeft">
      <div class="modal-root" id="verify-delete-song-root">
        <div class="modal-north">Remove song?</div>
        <div class="modal-center">
          <div class="modal-center-content">
            Are you sure you wish to permanently remove <span> {} </span> from
            the playlist?
          </div>
        </div>
        <div class="modal-south">
          <input
            type="button"
            id="delete-song-confirm-button"
            class="modal-button"
            value="Confirm"
          />
          <input
            type="button"
            id="delete-song-cancel-button"
            class="modal-button"
            value="Cancel"
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteSongModal;
