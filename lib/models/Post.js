import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  postPhoto: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;