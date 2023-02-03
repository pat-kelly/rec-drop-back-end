import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  content: String
})

const likeSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

const recommendationSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Song', 'Album', 'Movie', 'TV Show', 'Book'],
  },
  title: {
    type: String,
    required: true
  },
  creator: {
    type: String,
  },
  year: {
    type: Number,
    min: 0
  },
  genre: {
    type: String
  },
  photo: {
    type: String
  },
  likes: [likeSchema],
  comments: [commentSchema]  
})

const Recommendation = mongoose.model('Recommendation', recommendationSchema)

export {Recommendation}