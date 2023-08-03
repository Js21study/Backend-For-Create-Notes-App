import mongoose from 'mongoose';

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    category: {
      type: Number,
      default: 0,
    },
    dates: {
      type: String,
    },
    archive: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Notes', NotesSchema);
