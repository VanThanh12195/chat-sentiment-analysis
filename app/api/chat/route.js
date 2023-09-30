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
  const { message } = await req.json();

  pusher.trigger("chat-room", "new-message", {
    message: message,
  });

  return NextResponse.json("");
}
