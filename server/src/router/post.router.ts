import express from "express";
import authMiddleware from "../middleware/authorization.middleware";
import {
  getFavoritePosts,
  getPosts,
  toggleFavorite,
  toggleRead,
} from "../service/post.service";
import { IUser } from "../model/user.model";

const PostRouter = express.Router();

PostRouter.get("/all", authMiddleware, async (req, res) => {
  try {
    const result = await getPosts(req.user as IUser, { type: "all" });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
PostRouter.get("/feed/:feedId", authMiddleware, async (req, res) => {
  try {
    const result = await getPosts(req.user as IUser, {
      type: "feed",
      data: req.params.feedId,
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
PostRouter.get("/folder/:folderId", authMiddleware, async (req, res) => {
  try {
    const result = await getPosts(req.user as IUser, {
      type: "folder",
      data: req.params.folderId,
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

PostRouter.get("/favorites", authMiddleware, async (req, res) => {
  try {
    const result = await getFavoritePosts(req.user as IUser);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

PostRouter.patch(
  "/:postId/toggle-favorite",
  authMiddleware,
  async (req, res) => {
    try {
      const result = await toggleFavorite(req.params.postId, req.user as IUser);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send("Invalid ID");
    }
  }
);

PostRouter.patch("/:postId/toggle-read", authMiddleware, async (req, res) => {
  try {
    const result = await toggleRead(req.params.postId, req.user as IUser);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("Invalid ID");
  }
});

export default PostRouter;
