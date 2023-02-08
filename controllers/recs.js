import { Profile } from "../models/profile.js";
import { Recommendation } from "../models/rec.js";
import { v2 as cloudinary } from 'cloudinary';

const index = async(req, res) =>{
  try {
    const recs = await Recommendation.find({})
      .populate('likes comments owner')
      .sort({ createdAt: 'desc' })
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

const show = async(req, res) =>{
  try {
    const rec = await Recommendation.findById(req.params.id)
      .populate('likes comments comments.owner owner')
    res.status(200).json(rec);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const update = async(req, res) =>{
  try {
    const rec = await Recommendation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true })
      .populate('likes comments owner')
    res.status(201).json(rec);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);    
  }
}

const delRec = async(req, res) =>{
  try {
    const rec = await Recommendation.findById(req.params.id)
    if( rec.owner.equals(req.user.profile)){
      rec.show = false;
      await rec.save()
      res.status(200).json(rec)
    }
    else{
      throw new Error('Not Authorized');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const addPhoto = async(req, res) =>{
try {
  const imageFile = req.files.photo.path;
  const rec = await Recommendation.findById(req.params.id)
  const image = await cloudinary.uploader.upload(imageFile, {tags: 'rec photo'});
  rec.photo = image.url;
  await rec.save();
  res.status(201).json(rec)
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
}

const createComment = async(req, res) =>{
  try {
    req.body.owner = req.user.profile;
    const rec = await Recommendation.findById(req.params.id)
    rec.comments.push(req.body);
    await rec.save()
    const profile = await Profile.findById(req.user.profile);
    const newComment = rec.comments[rec.comments.length -1]
    newComment.owner = profile
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const delComment = async(req, res) =>{
  try {
    const rec = await Recommendation.findById(req.params.rid)
    rec.comments.remove({ _id: req.params.cid })
    const newRec = await rec.save()
    res.status(200).json(newRec)
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const like = async(req, res) =>{
  try {
    const rec = await Recommendation.findById(req.params.id)
      .populate('owner')
    if(rec.likes.length){
      const likeIdx = rec.likes.findIndex(like => like.owner.equals(req.user.profile));
      if(likeIdx < 0){
        rec.likes.push({owner: req.user.profile})
      }else{
        rec.likes.remove({owner: req.user.profile})
      }
    }else{
      rec.likes.push({owner: req.user.profile})
    }
    const newRec = await rec.save();
    res.status(201).json(newRec);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export {
  index,
  create,
  show,
  update,
  delRec as delete,
  addPhoto,
  createComment,
  delComment,
  like,
}