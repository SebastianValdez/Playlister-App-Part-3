import { jsTPS_Transaction } from "../common/jsTPS";

export default class DeleteSong_Transaction extends jsTPS_Transaction {
  constructor(initStore, song, index) {
    super();
    this.store = initStore;
    this.song = song;
    this.index = index;
  }

  doTransaction() {
    this.store.deleteSong(this.index);
  }

  undoTransaction() {
    this.store.addOldSong(this.store.currentList._id, this.index, this.song);
  }
}
