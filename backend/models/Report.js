import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  image: String,
  location: String,
  status: {
    type: String,
    default: "Pending"
  },
  aiVerified: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Report", reportSchema);