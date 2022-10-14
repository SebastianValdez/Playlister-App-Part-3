import { jsTPS_Transaction } from "../common/jsTPS";

export default class EditSong_Transaction extends jsTPS_Transaction {
  constructor(initStore, index, oldSong, newSong) {
    super();
    this.store = initStore;
    this.index = index;
    this.oldSong = oldSong;
    this.newSong = newSong;
  }

  doTransaction() {
    this.store.editSong(this.newSong, this.index);
  }

  undoTransaction() {
    this.store.editSong(this.oldSong, this.index);
  }
}
