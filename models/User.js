import mongoose, { Schema, model } from "mongoose";

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  avatar: { type: String },
});

export default mongoose.model("User", User);
