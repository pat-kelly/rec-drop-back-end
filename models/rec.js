import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  content: String
},
{ timestamps: true })

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
  description: {
    type: String,
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
    type: String,
    default: ''
  },
  show: {
    type: Boolean,
    default: true
  },
  likes: [likeSchema],
  comments: [commentSchema]  
},
{ timestamps: true })

const Recommendation = mongoose.model('Recommendation', recommendationSchema)

export {Recommendation}