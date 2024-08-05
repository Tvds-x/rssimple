import parser from "../utils/parser";
import Posts, { IPost } from "../model/post.model";
import { IUser } from "../model/user.model";
import { getFeeds } from "./feed.service";
import { getStartOfYesterday } from "../utils/dateManager";
import { getFolderFeeds } from "./folder.service";

async function parsePosts(url: string, feedId: string, user: string) {
  try {
    const feed = await parser.parseURL(url);

    feed.items.forEach((item) => {
      (item.feed = feedId), (item.user = user);
    });

    return feed.items;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

async function getPosts(
  user: IUser,
  options: { type: "all" | "feed" | "folder"; data?: string }
) {
  await fetchPosts(user);
  switch (options.type) {
    case "all":
      return await Posts.find({ user: user._id })
        .populate("feed")
        .sort({ isoDate: -1 });
    case "feed":
      return await Posts.find({ user: user._id, feed: options.data })
        .populate("feed")
        .sort({ isoDate: -1 });
    case "folder":
      const folderFeeds = await getFolderFeeds(options.data!);
      return await Posts.find({ user: user._id, feed: { $in: folderFeeds } })
        .populate("feed")
        .sort({ isoDate: -1 });

    default:
      throw new Error("Invalid query");
  }
}

async function getFavoritePosts(user: IUser) {
  return await Posts.find({ user: user._id, isFavorite: true })
    .populate("feed")
    .sort({ isoDate: -1 });
}

async function fetchPosts(user: IUser) {
  try {
    const usersFeeds = await getFeeds(user);

    const posts = await Promise.all(
      usersFeeds.map((feed) => parsePosts(feed?.feedURL, feed._id, feed.user))
    ).then((data) => data.flat());

    const newestPosts = posts.filter((post) => {
      if (new Date(post.isoDate!).getTime() > getStartOfYesterday()) {
        return post;
      }
    }) as IPost[];

    for (const post of newestPosts) {
      const existingPost = await Posts.findOne({
        link: post.link,
        user: post.user,
      });

      if (!existingPost) {
        await Posts.create(post);
      }
    }
  } catch (error) {
    console.log(`Error during fetching: ${error}`);
    throw new Error();
  }
}

async function toggleFavorite(id: string, user: IUser) {
  const post = await Posts.findById(id);

  if (post?.user?.toHexString() === user._id) {
    post.isFavorite = !post.isFavorite;
    return await post.updateOne(post);
  }
  throw new Error();
}

async function toggleRead(id: string, user: IUser) {
  const post = await Posts.findById(id);

  if (post?.user?.toHexString() === user._id) {
    post.isRead = !post.isRead;
    return await post.updateOne(post);
  }

  throw new Error();
}

async function deleteOldPosts() {
  await Posts.deleteMany({
    isoDate: { $lt: new Date(getStartOfYesterday()).toISOString() },
    isFavorite: false,
  });
}

export {
  getFavoritePosts,
  getPosts,
  toggleFavorite,
  toggleRead,
  deleteOldPosts,
};
