import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
  title: { type: String, require: true },
  user: { type: "ObjectId", ref: "User", require: true },
  feeds: [{ type: "ObjectId", ref: "Feed", require: true, default: [] }],
});

export interface IFolder {
  _id: string;
  title: string;
  user: string;
  feeds: string[];
  __v: number;
}

const Folders = mongoose.model("Folder", FolderSchema);

export default Folders;
