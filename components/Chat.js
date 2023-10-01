"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const searchParams = useSearchParams();

  const name = searchParams.get("name");

  console.log("log in " + name);

  useEffect(() => {
    const pusher = new Pusher("6df44b3f6096c951d0af", {
      cluster: "us2",
      userAuthentication: {
        endpoint: "api/pusher/user-auth",
        transport: "ajax",
        params: {},
        headers: {},
        paramsProvider: null,
        headersProvider: null,
        customHandler: null,
      },
      channelAuthorization: {
        endpoint: "api/pusher/auth",
        transport: "ajax",
        params: {},
        headers: {},
        customHandler: null,
      },
    });

    pusher.signin();

    pusher.bind("pusher:signin_success", (data) => {
      console.log("Welcome " + JSON.parse(data.user_data).user_info.name);
    });

    const channel = pusher.subscribe("private-chat-room");

    channel.bind("pusher:subscription_error", (error) => {
      var { status } = error;
      console.log("channel subscription error is " + status);
    });

    channel.bind("pusher:subscription_succeeded", (data) => {
      console.log("channel subscription is " + JSON.stringify(data));
    });

    channel.bind("new-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    pusher.connection.bind("connected", (data) => {
      // return a socketId
      console.log("socketId object is " + JSON.stringify(data));
    });

    return () => {
      channel.unbind("new-message");
      pusher.unsubscribe("chat-room");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/chat", {
        message: newMessage,
      });

      console.log("Message sent successfully:", response.data);

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setNewMessage("");
  };

  return (
    <div>
      <h1>Chat</h1>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
