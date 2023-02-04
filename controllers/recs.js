import { Profile } from "../models/profile.js";
import { Recommendation } from "../models/rec.js";

const index = async(req, res) =>{
  try {
    const recs = await Recommendation.find({})
      .populate('likes')
      .populate('comments')
    res.status(200).json(recs);
    

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const create = async(req, res) =>{
  try {
    req.body.owner = req.user.profile;
    const rec = await Recommendation.create(req.body);

    res.status(201).json(rec);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);    
  }
}

export {
  index,
  create,
}