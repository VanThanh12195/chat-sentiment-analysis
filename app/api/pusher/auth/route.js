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
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

    const authResponse = pusher.authorizeChannel(socketId, channelName);

    console.log("channel auth is " + JSON.stringify(authResponse));

  return new Response(JSON.stringify(authResponse));
}
