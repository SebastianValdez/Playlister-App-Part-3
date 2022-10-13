import { jsTPS_Transaction } from "../common/jsTPS";

export default class EditSong_Transaction extends jsTPS_Transaction {
  constructor(
    initStore,
    index,
    oldSongTitle,
    oldSongArtist,
    oldSongId,
    songTitle,
    songArtist,
    songId
  ) {
    super();
    this.store = initStore;
    this.index = index;
    this.oldSongTitle = oldSongTitle;
    this.oldSongArtist = oldSongArtist;
    this.oldSongId = oldSongId;
    this.songTitle = songTitle;
    this.songArtist = songArtist;
    this.songId = songId;
  }

  doTransaction() {
    this.store.editSong(
      this.index,
      this.songTitle,
      this.songArtist,
      this.songId
    );
  }

  undoTransaction() {
    this.store.editSong(
      this.index,
      this.oldSongTitle,
      this.oldSongArtist,
      this.oldSongId
    );
  }
}
