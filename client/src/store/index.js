import { createContext, useState } from "react";
import jsTPS from "../common/jsTPS";
import api from "../api";
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
  CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
  CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
  CREATE_NEW_LIST: "CREATE_NEW_LIST",
  LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
  SET_CURRENT_LIST: "SET_CURRENT_LIST",
  SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
  MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
  DELETE_LIST: "DELETE_LIST",
  MARK_SONG_FOR_EDIT_OR_DELETE: "MARK_SONG_FOR_EDIT_OR_DELETE",
};

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
    idNamePairs: [],
    currentList: null,
    newListCounter: 0,
    listNameActive: false,
    markedList: 0, // ! For playlist deletion, song deleting, and song editing | We need to mark a playlist for each of these scenarios
    song: null,
    index: 0,
  });

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // LIST UPDATE OF ITS NAME
      case GlobalStoreActionType.CHANGE_LIST_NAME: {
        return setStore({
          idNamePairs: payload.idNamePairs,
          currentList: payload.playlist,
          newListCounter: store.newListCounter,
          listNameActive: false,
          markedList: 0,
          song: null,
          index: 0,
        });
      }
      // STOP EDITING THE CURRENT LIST
      case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          markedList: 0,
          song: null,
          index: 0,
        });
      }
      // CREATE A NEW LIST
      // ! PART 1
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter + 1,
          listNameActive: false,
          markedList: 0,
          song: null,
          index: 0,
        });
      }
      // GET ALL THE LISTS SO WE CAN PRESENT THEM
      case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
        return setStore({
          idNamePairs: payload,
          currentList: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          markedList: 0,
          song: null,
          index: 0,
        });
      }
      // ! PART 2 - PREPARE TO DELETE A LIST
      case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          listNameActive: false,
          markedList: payload,
          song: null,
          index: 0,
        });
      }
      // UPDATE A LIST
      case GlobalStoreActionType.SET_CURRENT_LIST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter,
          listNameActive: false,
          markedList: 0,
          song: null,
          index: 0,
        });
      }
      // START EDITING A LIST NAME
      case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter,
          listNameActive: true,
          markedList: 0,
          song: null,
          index: 0,
        });
      }
      //! PART 2 - DELETE THE LIST AND UPDATE THE STATE
      case GlobalStoreActionType.DELETE_LIST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload.currentList,
          newListCounter: payload.newListCounter,
          listNameActive: false,
          markedList: 0,
          song: null,
          index: 0,
        });
      }

      case GlobalStoreActionType.MARK_SONG_FOR_EDIT_OR_DELETE: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: payload.newListCounter,
          listNameActive: false,
          markedList: store.markedList,
          song: payload.song,
          index: payload.index,
        });
      }

      default:
        return store;
    }
  };
  // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
  // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
  // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

  // THIS FUNCTION PROCESSES CHANGING A LIST NAME
  store.changeListName = function (id, newName) {
    // GET THE LIST
    async function asyncChangeListName(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playist;
        playlist.name = newName;
        async function updateList(playlist) {
          response = await api.updatePlaylistById(playlist._id, playlist);
          if (response.data.success) {
            async function getListPairs(playlist) {
              response = await api.getPlaylistPairs();
              if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                  type: GlobalStoreActionType.CHANGE_LIST_NAME,
                  payload: {
                    idNamePairs: pairsArray,
                    playlist: playlist,
                  },
                });
              }
            }
            getListPairs(playlist);
          }
        }
        updateList(playlist);
      }
    }
    asyncChangeListName(id);
  };

  // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
  store.closeCurrentList = function () {
    storeReducer({
      type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
      payload: {},
    });
  };

  // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
  store.loadIdNamePairs = function () {
    async function asyncLoadIdNamePairs() {
      const response = await api.getPlaylistPairs();
      if (response.data.success) {
        let pairsArray = response.data.idNamePairs;
        storeReducer({
          type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
          payload: pairsArray,
        });
      } else {
        console.log("API FAILED TO GET THE LIST PAIRS");
      }
    }
    asyncLoadIdNamePairs();
  };

  store.setCurrentList = function (id) {
    async function asyncSetCurrentList(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;

        if (response.data.success) {
          storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: playlist,
          });
          store.history.push("/playlist/" + playlist._id);
        }
      }
    }
    asyncSetCurrentList(id);
  };

  store.getPlaylistSize = function () {
    return store.currentList.songs.length;
  };
  store.undo = function () {
    tps.undoTransaction();
  };
  store.redo = function () {
    tps.doTransaction();
  };

  // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
  store.setlistNameActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
      payload: null,
    });
  };

  // ! PART 1 : NEW LIST CREATION - METHOD THAT CREATES A NEW LIST
  store.createNewList = function () {
    async function asyncAddNewPlaylist() {
      const playlist = { name: "Untitled", songs: [] };
      const newPlaylist = await api.addNewPlaylist(playlist);
      if (newPlaylist.data.success) {
        storeReducer({
          type: GlobalStoreActionType.CREATE_NEW_LIST,
          payload: newPlaylist.data.playlist,
        });
        store.setCurrentList(newPlaylist.data.playlist._id);
      }
    }
    asyncAddNewPlaylist();
  };

  // ! PART 2 : DELETING A PLAYLIST
  store.deleteList = function (id) {
    console.log(store);
    async function asyncDeletePlaylist(id) {
      const playlist = await api.deletePlaylist(id);
      if (playlist.data.success) {
        storeReducer({
          type: GlobalStoreActionType.DELETE_LIST,
          payload: {
            currentList: null,
            newListCounter: store.newListCounter - 1, // ! Might have to remove this?
          },
        });
        store.loadIdNamePairs();
      }
    }
    asyncDeletePlaylist(id);
  };

  store.markPlaylist = function (id) {
    storeReducer({
      type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
      payload: id,
    });
  };

  // ! PART 3 : ADD NEW SONG TO CURRENT PLAYLIST
  store.addNewSongToList = function (id) {
    async function asyncAddNewSong(id) {
      const songs = store.currentList.songs;
      const song = {
        title: "Untitled",
        artist: "Untitled",
        youTubeId: "dQw4w9WgXcQ",
      };
      songs.push(song);
      const newPlaylist = await api.addNewSong(id, store.currentList);
      if (newPlaylist.data.success) {
        store.setCurrentList(newPlaylist.data.playlist._id);
      }
    }
    asyncAddNewSong(id);
  };

  store.markSongForEditOrDelete = function (song, index) {
    storeReducer({
      type: GlobalStoreActionType.MARK_SONG_FOR_EDIT_OR_DELETE,
      payload: {
        song: song,
        index: index,
      },
    });
  };

  // ! PART 4 : EDITING A SONG IN THE PLAYLIST
  store.editSong = function (song, index) {
    async function asyncEditSong(song, index) {
      let songs = store.currentList.songs;
      songs[index] = song;
      let newSongs = {
        songs: songs,
      };
      const playlist = await api.editSong(store.currentList._id, newSongs);
      if (playlist.data.success) {
        store.setCurrentList(playlist.data.playlist._id);
      }
    }
    asyncEditSong(song, index);
  };

  // ! PART 5 : DELETING A SONG FROM THE PLAYLIST
  store.deleteSong = function (song, index) {
    async function asyncDeleteSong(song, index) {
      let songs = store.currentList.songs;
      songs.splice(index, 1);
      let newSongs = {
        songs: songs,
      };
      const playlist = await api.deleteSong(store.currentList._id, newSongs);
      if (playlist.data.success) {
        store.setCurrentList(playlist.data.playlist._id);
      }
    }
    asyncDeleteSong(song, index);
  };

  // ! PART 6 - HANDLE THE MOVEMENT OF SONG CARDS
  store.moveSong = function (start, end) {
    async function asyncMoveSong(start, end) {
      let songs = store.currentList.songs;

      if (start < end) {
        let temp = songs[start];
        for (let i = start; i < end; i++) {
          songs[i] = songs[i + 1];
          console.log(i + 1);
          console.log(songs[i]);
          console.log(songs[i + 1]);
        }
        songs[end] = temp;
      } else if (start > end) {
        let temp = songs[start];
        for (let i = start; i > end; i--) {
          songs[i] = songs[i - 1];
        }
        songs[end] = temp;
      }

      let newSongs = {
        songs: songs,
      };
      const playlist = await api.moveSong(store.currentList._id, newSongs);
      if (playlist.data.success) {
        store.setCurrentList(playlist.data.playlist._id);
      }
    }
    asyncMoveSong(start, end);
  };

  // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
  return { store, storeReducer };
};
