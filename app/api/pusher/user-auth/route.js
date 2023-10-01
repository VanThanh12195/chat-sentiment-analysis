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

  const socketId = data.split("=")[1];

  // Replace this with code to retrieve the actual user id and info
  const user = {
    id: "some_id",
    user_info: {
      name: "John Smith",
    },
  };
  const authResponse = pusher.authenticateUser(socketId, user);

  return new Response(JSON.stringify(authResponse));
}
