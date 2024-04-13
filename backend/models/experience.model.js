import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  period: {
    type: String,
    default: Date.now,
  },
  isPublic:{
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    default:
      "https://my.traveldiariesapp.com/assets/traveldiaries/new-diary.jpg",
  },
  description: {
    type: String,
  },
});

export default mongoose.model("experience", experienceSchema);
