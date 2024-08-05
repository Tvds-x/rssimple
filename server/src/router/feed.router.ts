import express from "express";
import authMiddleware from "../middleware/authorization.middleware";
import { body, validationResult } from "express-validator";
import {
  createFeed,
  deleteFeed,
  getFeeds,
  updateFeedTitle,
} from "../service/feed.service";
import { IUser } from "../model/user.model";
import { renameFolder } from "../service/folder.service";

const FeedRouter = express.Router();

FeedRouter.get("/all", authMiddleware, async (req, res) => {
  try {
    const feeds = await getFeeds(req.user as IUser);
    res.status(200).send(feeds);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

FeedRouter.post(
  "/new",
  authMiddleware,
  body("url").isURL(),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) throw new Error();
      const feed = await createFeed(req.body.url, req.user as IUser);
      res.status(200).send(feed);
    } catch (error) {
      console.log(error);
      res.status(400).send("Invalid URL");
    }
  }
);

FeedRouter.put(
  "/:feedId",
  authMiddleware,
  body("title").isLength({ min: 1, max: 20 }),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) throw new Error();

      const updatedFolder = await renameFolder(
        req.params.feedId,
        req.body.title,
        req.user as IUser
      );

      res.status(200).send(updatedFolder);
    } catch (error) {
      console.log(error);
      res.status(400).send("Invalid ID");
    }
  }
);

FeedRouter.delete("/:feedId", authMiddleware, async (req, res) => {
  try {
    const result = await deleteFeed(req.params.feedId, req.user as IUser);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid ID");
  }
});

export default FeedRouter;
