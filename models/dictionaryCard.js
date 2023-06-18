import mongoose, { Schema, model } from "mongoose";

const dictCard = new mongoose.Schema({
  userId: { type: String, required: true },
  word: { type: String, required: true },
  translation: { type: String, required: true },
  transcription: { type: String, required: true },
  explanation: { type: String, required: true },
  example: { type: String, required: true },
  exampleTranslation: { type: String, required: true },
  picture: { type: String },
  isAdded: { type: Boolean },
});

export default mongoose.model("dictCard", dictCard);
