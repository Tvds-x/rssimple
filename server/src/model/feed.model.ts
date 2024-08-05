import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema({
  link: { type: String, require: true },
  feedURL: { type: String, require: true },
  title: { type: String, require: true },
  date: { type: String, require: true },
  user: { type: "ObjectId", ref: "User", require: true },
  icon: String,
});

export interface IFeed {
  _id: string;
  link: string;
  feedURL: string;
  title: string;
  date: string;
  user: string;
  icon: string;
  __v: number;
}

const Feeds = mongoose.model("Feed", FeedSchema);

export default Feeds;
