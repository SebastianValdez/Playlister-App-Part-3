const Playlist = require("../models/playlist-model");
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
  const body = req.body;
  console.log("createPlaylist body: " + body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Playlist",
    });
  }

  const playlist = new Playlist(body);
  console.log("playlist: " + JSON.stringify(body));
  if (!playlist) {
    return res.status(400).json({ success: false, error: err });
  }

  playlist
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        playlist: playlist,
        message: "Playlist Created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Playlist Not Created!",
      });
    });
};
getPlaylistById = async (req, res) => {
  await Playlist.findOne({ _id: req.params.id }, (err, list) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, playlist: list });
  }).catch((err) => console.log(err));
};
getPlaylists = async (req, res) => {
  await Playlist.find({}, (err, playlists) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!playlists.length) {
      return res
        .status(404)
        .json({ success: false, error: `Playlists not found` });
    }
    return res.status(200).json({ success: true, data: playlists });
  }).catch((err) => console.log(err));
};
getPlaylistPairs = async (req, res) => {
  await Playlist.find({}, (err, playlists) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!playlists.length) {
      return res
        .status(404)
        .json({ success: false, error: "Playlists not found" });
    } else {
      // PUT ALL THE LISTS INTO ID, NAME PAIRS
      let pairs = [];
      for (let key in playlists) {
        let list = playlists[key];
        let pair = {
          _id: list._id,
          name: list.name,
        };
        pairs.push(pair);
      }
      return res.status(200).json({ success: true, idNamePairs: pairs });
    }
  }).catch((err) => console.log(err));
};

// ! PART 2 - Deleting a playlist
deletePlaylist = async (req, res) => {
  const playlist = await Playlist.findById({ _id: req.params.id });
  await Playlist.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    } else {
      return res.status(200).json({ success: true, playlist: playlist });
    }
  }).catch((err) => console.log(err));
};

// ! PART 3 - Adding a song to the playlist
addSong = async (req, res) => {
  const playlist = await Playlist.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        songs: {
          title: "Untitled",
          artist: "Untitled",
          youTubeId: "dQw4w9WgXcQ",
        },
      },
    },
    (err, playlist) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      } else {
        return res.status(200).json({ success: true, playlist: playlist });
      }
    }
  );
};

// ! PART 5 - Editing a song in the current playlist, This will also be used for move song
editSong = async (req, res) => {
  const playlist1 = await Playlist.findById({ _id: req.params.id });
  console.log(playlist1);
  console.log("Songs ", req.body.songs);
  console.log("Body ", req.body);
  const playlist = await Playlist.findOneAndUpdate(
    { _id: req.params.id },
    { songs: req.body.songs },
    (err, playlist) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      } else {
        return res.status(200).json({ success: true, playlist: playlist });
      }
    }
  );
};

// ! PART 6 - Removing a song from the current playlist
deleteSong = async (req, res) => {
  console.log(req.body.songId);
  const playlist = await Playlist.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
        songs: { _id: req.body.songId },
      },
    },
    (err, playlist) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      } else {
        return res.status(200).json({ success: true, playlist: playlist });
      }
    }
  );
};

module.exports = {
  createPlaylist,
  getPlaylists,
  getPlaylistPairs,
  getPlaylistById,
  deletePlaylist,
  addSong,
  editSong,
  deleteSong,
};
