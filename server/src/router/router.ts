import express from "express";
import UserRouter from "./user.router";
import FeedRouter from "./feed.router";
import PostRouter from "./post.router";
import FolderRouter from "./folder.router";

const router = express.Router();

router.use("/user", UserRouter);
router.use("/feed", FeedRouter);
router.use("/post", PostRouter);
router.use("/folder", FolderRouter);

export default router;
