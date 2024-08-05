import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import router from "./src/router/router";
import cron from "node-cron";

import { deleteOldPosts } from "./src/service/post.service";
import { updateStartOfYesterday } from "./src/utils/dateManager";
import { getFolderFeeds } from "./src/service/folder.service";

const app = express();

mongoose.connect(process.env.BD!);

app.use(express.json());
app.use(cors());
app.use(router);

app.get("/test", async (req, res) => {
  try {
    console.log(await getFolderFeeds("6699677655092759c008e1ff"));
    res.status(200).send("test");
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid feed URL");
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on ${process.env.ORIGIN}:${port}`);

  cron.schedule("0 0 * * *", async () => {
    try {
      updateStartOfYesterday();
      await deleteOldPosts();
      console.log(`Posts cleaning at ${new Date(Date.now()).toISOString()}`);
    } catch (error) {
      console.log(`Error during posts cleaning ${error}`);
    }
  });
});
