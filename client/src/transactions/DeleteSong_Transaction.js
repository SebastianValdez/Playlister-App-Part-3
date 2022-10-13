import { jsTPS_Transaction } from "../common/jsTPS";

export default class DeleteSong_Transaction extends jsTPS_Transaction {
  constructor(initStore, index) {
    super();
    this.store = initStore;
    this.index = index;
    this.song = {};
  }

  doTransaction() {
    this.store.deleteSong(null, this.index);
  }

  undoTransaction() {
    this.app.addOldSong(this.index, this.song);
  }
}
