/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require("express");
const PlaylistController = require("../controllers/playlist-controller");
const router = express.Router();

router.post("/playlist", PlaylistController.createPlaylist); // ! Playlist Creation
router.get("/playlist/:id", PlaylistController.getPlaylistById); // ! Gets a single playlist
router.get("/playlists", PlaylistController.getPlaylists); // ! Gets all playlists
router.get("/playlistpairs", PlaylistController.getPlaylistPairs); // ! Gets all playlists by title and id pairs

router.delete("/playlist/:id", PlaylistController.deletePlaylist); // ! PART 2 - Playlist deletion

//router.post("/playlist/:id/editSong", PlaylistController.editSong); // ! PART 5 - Editing a song from the current list
router.post("/playlist/:id/song", PlaylistController.deleteSong); // ! PART 6 - Removing a song from the current list
router.post("/playlist/:id", PlaylistController.updatePlaylist); // ! PART 3 - Adding a song to a list

module.exports = router;
