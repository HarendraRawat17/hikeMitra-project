import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: 2,
      maxlength: 30
    },

    age: {
      type: String,
      trim: true,
      required: [true, "age is required"]
    },

}, {timestamps: true}
);

export const User  = mongoose.model("User", userSchema)