import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  isoDate: { type: String, required: true },
  author: String,
  content: String,
  contentSnippet: String,
  feed: { type: "ObjectId", ref: "Feed", require: true },
  user: { type: "ObjectId", ref: "User", require: true },
  isRead: { type: Boolean, default: false },
  isFavorite: { type: Boolean, default: false },
});

export interface IPost {
  _id: string;
  title: string;
  link: string;
  isoDate: string;
  author?: string;
  content?: string;
  contentSnippet?: string;
  feed: string;
  user: string;
  isRead: boolean;
  isFavorite: boolean;
  __v: number;
}
const Posts = mongoose.model("Post", PostSchema);

export default Posts;
