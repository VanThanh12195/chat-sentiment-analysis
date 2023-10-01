import { NextResponse } from "next/server";

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

export async function POST(req) {
  const data = await req.text();
  const [socketId, channelName, userName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  const listUserName = ["thanh", "ronaldo"];

  if (!listUserName.includes(userName))
    return new NextResponse(JSON.stringify("Invalid user name"), {
      status: 403,
    });

  const authResponse = pusher.authorizeChannel(socketId, channelName);

  return new NextResponse(JSON.stringify(authResponse));
}
