import mongoose, { Schema } from "mongoose";


const trekSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please Provide a trek title"],
      trim: true,
      lowercase: true,
    },
    location: {
      type: String,
      required: [true, "Where is this trek located?"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"]
    },
    discountPrice: {
      type: Number, // optional: To show "crossed out" Prices
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Moderate", "Difficult"]
    },
    duration: {
      type: String, // eg., "5 Days/ 4 Nights"
      required: true
    },
    description: {
      type: String,
      required: true
    },
    maxGroupSize: {
      type: Number,
      default: 15
    },
    images: [String], // Array of URLs(cloudinary/public links)
    bestSeason: {
      type: String,
      enum: ["Spring", "Summer", "Winter"]
    },
    isTrending: {
      type: Boolean,
      default: false
    }
  }, 
  {timestamps: true})


export const Treks = mongoose.model("Treks", trekSchema)