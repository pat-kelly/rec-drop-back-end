import { Playlist } from "../models/playlist.js";


const create = async(req, res) =>{
  try {
    req.body.owner = req.user.profile;
    const playList = await Playlist.create(req.body)
    res.status(201).json(playList);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

export{
  create,
}