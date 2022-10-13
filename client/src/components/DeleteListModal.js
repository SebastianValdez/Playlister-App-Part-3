import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import { useHistory } from "react-router-dom";

function DeleteListModal() {
  const { store } = useContext(GlobalStoreContext);
  const history = useHistory();

  function handleDeleteList() {
    let modal = document.getElementById("delete-list-modal");
    modal.classList.remove("is-visible");
    store.deleteList(store.markedList);
  }

  function handleCloseModal() {
    let modal = document.getElementById("delete-list-modal");
    modal.classList.remove("is-visible");
  }

  return (
    <div id="delete-list-modal" data-animation="slideInOutLeft" class="modal">
      <div className="modal-root" id="verify-delete-list-root">
        <div className="modal-north">
          Delete the <span id="delete-list-span-1"></span> playlist?
        </div>
        <div className="modal-center">
          <div className="modal-center-content">
            Are you sure you wish to permanently delete the{" "}
            <span id="delete-list-span-2"></span> playlist?
          </div>
        </div>
        <div className="modal-south">
          <input
            type="button"
            id="remove-song-confirm-button"
            className="modal-button"
            value="Confirm"
            onClick={handleDeleteList}
          />
          <input
            type="button"
            id="remove-song-cancel-button"
            className="modal-button"
            value="Cancel"
            onClick={handleCloseModal}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteListModal;
