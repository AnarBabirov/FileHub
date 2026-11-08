import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 4,
      maxLength: 12,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 60,
    },
  },
  {
    timestamps: true,
    collection: "user",
  },
);
const User = mongoose.model("User", userSchema);
export default User;
