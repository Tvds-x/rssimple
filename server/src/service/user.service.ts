import { TokenPayload } from "google-auth-library";
import { OAuth2Client } from "google-auth-library";
import Users from "../model/user.model";
import jwt from "jsonwebtoken";

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

async function findUser(payload: TokenPayload) {
  return (
    (await Users.findOne({ g_sub: payload.sub })) ||
    (await Users.create({
      g_sub: payload.sub,
      email: payload.email,
      name: payload.name,
    }))
  );
}

async function getAuthToken(googleToken: string) {
  const ticket = await client.verifyIdToken({ idToken: googleToken });
  const payload = ticket.getPayload();
  const user = await findUser(payload!);

  const authToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return authToken;
}

export { getAuthToken };
