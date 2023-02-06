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

const index = async(req, res) =>{
  try {
    const playlists = await Playlist.find({owner: req.user.profile})
    .populate({
      path: 'recs',
      populate: { path: 'owner'}
    });
    res.status(200).json(playlists);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

const update = async(req, res) =>{
  try {
    const pList = await Playlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('recs')
    res.status(201).json(pList);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}


export{
  create,
  index,
  update,
}