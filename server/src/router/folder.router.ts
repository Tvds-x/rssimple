import express from "express";
import authMiddleware from "../middleware/authorization.middleware";
import {
  createFolder,
  deleteFolder,
  getUserFolders,
  renameFolder,
  toggleFeedInFolder,
} from "../service/folder.service";
import { IUser } from "../model/user.model";
import { body, validationResult } from "express-validator";

const FolderRouter = express.Router();

FolderRouter.get("/all", authMiddleware, async (req, res) => {
  try {
    const folders = await getUserFolders(req.user as IUser);
    res.status(200).send(folders);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

FolderRouter.post(
  "/new",
  authMiddleware,
  body("title").notEmpty(),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) return res.status(400).send("Title required");

      const folder = await createFolder(req.body.title, req.user as IUser);
      res.status(200).send(folder);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
);

FolderRouter.post(
  "/toggle-feed/:folderId",
  body("feed").notEmpty(),
  authMiddleware,
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) return res.status(400).send("Feed ID required");

      const folder = await toggleFeedInFolder(
        req.params.folderId,
        req.body.feed,
        req.user as IUser
      );
      res.status(200).send(folder);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
);

FolderRouter.put(
  "/:feedId",
  authMiddleware,
  body("title").notEmpty(),
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) return res.status(400).send("Title required");

      const updatedFeed = await renameFolder(
        req.params.feedId,
        req.body.title,
        req.user as IUser
      );

      res.status(200).send(updatedFeed);
    } catch (error) {
      console.log(error);
      res.status(400).send("Invalid ID");
    }
  }
);

FolderRouter.delete("/:folderId", authMiddleware, async (req, res) => {
  try {
    const result = await deleteFolder(req.params.folderId, req.user as IUser);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid ID");
  }
});

export default FolderRouter;
