import { jsTPS_Transaction } from "../common/jsTPS";

export default class AddSong_Transaction extends jsTPS_Transaction {
  constructor(initStore) {
    super();
    this.store = initStore;
  }

  doTransaction() {
    this.store.addNewSongToList(this.store.currentList._id);
  }

  undoTransaction() {
    this.store.deleteSong(this.store.currentList.songs.length - 1);
  }
}
