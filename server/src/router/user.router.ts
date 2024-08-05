import express from "express";
import { getAuthToken } from "../service/user.service";

const UserRouter = express.Router();

UserRouter.post("/auth/google", async (req, res) => {
  const googleToken = req.body.token;
  try {
    const authToken = await getAuthToken(googleToken);

    res.status(200).send(authToken);
  } catch (error) {
    console.log(error);
    res.status(400).send("Google token required");
  }
});

export default UserRouter;
