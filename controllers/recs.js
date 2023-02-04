import { Profile } from "../models/profile.js";
import { Recommendation } from "../models/rec.js";

const index = async(req, res) =>{
  try {
    const recs = await Recommendation.find({})
      .populate('likes comments owner')
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
      .populate('likes comments')
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
      .populate('likes comments')
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

const createComment = async(req, res) =>{
  try {
    req.body.owner = req.user.profile;
    const rec = await Recommendation.findById(req.params.id)
      .populate('comments')
    rec.comments.push(req.body);
    const savedRec = await rec.save()
    res.status(201).json(savedRec);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const delComment = async(req, res) =>{
  //req.params.cid = comment id
  //req.params.rid = rec id
  try {
    //Find rec > find comment > splice comment out.
    const rec = await Recommendation.findById(req.params.rid)
      .populate('comments')
    console.log('cid: ', req.params.cid);
    const cIdx = rec.comments.findIndex( comment =>{
      console.log('comment id: ', comment._id)
      comment.equals(req.params.cid)
    })
    res.status(200).json(`Comment IDX: ${cIdx}`)
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
  createComment,
  delComment,
}