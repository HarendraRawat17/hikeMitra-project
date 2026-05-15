import mongoose, { Schema } from "mongoose";


const enrollmentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // This'll link my User Model
      required: true,
    },
    trek: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Treks',
      required: true
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    numberOfPeople: {
      type: Number,
      default: 1
    }
  }, 
  {timestamps: true}
);

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);