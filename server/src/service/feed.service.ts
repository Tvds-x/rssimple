import {} from "express";
import { IUser } from "../model/user.model";
import Feeds, { IFeed } from "../model/feed.model";
import parser from "../utils/parser";

async function getFeeds(user: IUser) {
  return (await Feeds.find({
    user: user._id,
  })) as IFeed[];
}

// Вот эту функцию протестировать без try/catch
async function createFeed(url: string, user: IUser) {
  try {
    const feedURL = new URL(url);
    const feed = await parser.parseURL(feedURL.href);
    return (
      (await Feeds.findOne({ user: user._id, feedURL: url })) ||
      (await Feeds.create({
        feedURL: feedURL.href,
        link: feed.link,
        title: feed.title,
        user: user._id,
        date: feed.lastBuildDate,
        icon: feed.image || `https://logo.clearbit.com/${feedURL.hostname}`,
      }))
    );
  } catch (error) {
    throw new Error();
  }
}

async function updateFeedTitle(id: string, title: string, user: IUser) {
  const feed = await Feeds.findById(id);
  if (feed?.user?.toHexString() === user._id) {
    feed.title = title;
    return await feed.updateOne(feed);
  }
  throw new Error();
}

async function deleteFeed(id: string, user: IUser) {
  const feed = await Feeds.findById(id);
  if (feed?.user?.toHexString() === user._id) {
    return await feed.deleteOne();
  }
  throw new Error();
}

export { createFeed, getFeeds, updateFeedTitle, deleteFeed };
