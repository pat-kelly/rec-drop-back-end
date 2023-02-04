import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  title: {
    type: String,
    required: true
  },
  recs: [{
    type: Schema.Types.ObjectId,
    ref: 'Recommendation'
  }],
  public: Boolean
},
{ timestamps: true })

const Playlist = mongoose.model('Playlist', playlistSchema);

export {Playlist}