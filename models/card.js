import mongoose, { Schema, model } from "mongoose";

const Card = new mongoose.Schema({
  word: { type: String, required: true },
  translation: { type: String, required: true },
  transcription: { type: String, required: true },
  explanation: { type: String, required: true },
  example: { type: String, required: true },
  exampleTranslation: { type: String, required: true },
  picture: { type: String },
});

export default mongoose.model("Card", Card);
