import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  g_sub: { type: String, require: true, unique: true },
  email: { type: String, require: true },
  name: { type: String, require: true },
});

export interface IUser {
  _id: string;
  g_sub: string;
  email: string;
  name: string;
  __v: number;
}

const Users = mongoose.model("User", UserSchema);

export default Users;
