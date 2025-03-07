import mongoose from "mongoose";
import { type } from "os";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter a username"],
    },

    email: {
      type: String,
      required: [true, "Enter an email"],
    },

    password: {
      type: String,
      required: [true, "Enter a password"],
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", // deafault image for the user
    },
    bio: {
      type: String,
      default: "I am a new user",
    },
    isVerified: {
      type: String,
      default: "no",
    },
    verificationCode: {
      type: String,
      default: null,
    },
    verificationCodeExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    minimize: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
