import { ObjectId } from "mongodb";
import Folders, { IFolder } from "../model/folder.model";
import { IUser } from "../model/user.model";

async function getUserFolders(user: IUser) {
  return await Folders.find({ user: user._id });
}

async function createFolder(title: string, user: IUser) {
  return await Folders.create({ title, user: user._id });
}

async function getFolderFeeds(id: string) {
  const folder = (await Folders.findById(id).lean()) as IFolder;
  return folder.feeds.map((feed) => feed.toString());
}

async function toggleFeedInFolder(
  folderId: string,
  feedId: string,
  user: IUser
) {
  const folder = await Folders.findOne({ _id: folderId, user: user._id });
  if (!folder) throw new Error();

  const feedIndex = folder?.feeds.indexOf(ObjectId.createFromHexString(feedId));

  if (feedIndex === -1) {
    folder.feeds.push(ObjectId.createFromHexString(feedId));
  } else {
    folder.feeds.splice(feedIndex, 1);
  }
  await folder.save();
  return folder;
}

async function deleteFolder(id: string, user: IUser) {
  const folder = await Folders.findById(id);
  if (folder?.user?.toHexString() === user._id) {
    return await folder.deleteOne();
  }
  throw new Error();
}
async function renameFolder(id: string, title: string, user: IUser) {
  const folder = await Folders.findById(id);
  if (folder?.user?.toHexString() === user._id) {
    folder.title = title;
    return await folder.updateOne(folder);
  }
  throw new Error();
}

export {
  getUserFolders,
  createFolder,
  deleteFolder,
  renameFolder,
  toggleFeedInFolder,
  getFolderFeeds,
};
