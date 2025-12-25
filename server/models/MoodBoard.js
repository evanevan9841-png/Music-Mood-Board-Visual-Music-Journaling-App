import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  link: { type: String },
  note: { type: String }
});

const moodBoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  emoji: { type: String, required: true },
  moodColor: { type: String, required: true },
  description: { type: String },
  songs: [songSchema],
  createdAt: { type: Date, default: Date.now }
});

const MoodBoard = mongoose.model('MoodBoard', moodBoardSchema);

export default MoodBoard;
