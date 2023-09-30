"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const pusher = new Pusher("6df44b3f6096c951d0af", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("chat-room");

    channel.bind("new-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
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
