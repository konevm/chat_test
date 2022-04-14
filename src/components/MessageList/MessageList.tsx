import React, { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import PostMessage from "../PostMessage/PostMessage";
import { IStoreMessages } from "../../app/storeSlice";

const MessageList: React.FC = () => {
  const [messagesSlice, setMessagesSlice] = useState<number>(25);
  const stateData = useAppSelector((store) => store.data);
  const allMessages = stateData.data;

  const [messagesFromLocal, setMessagesFromLocal] =
    useState<IStoreMessages[]>(allMessages);

  const GetItemsFromLocal = () => {
    const history = localStorage.getItem(stateData.chat);
    if (history) {
      const messages = JSON.parse(history);
      setMessagesFromLocal(messages);
    }
  };

  if (stateData.name !== "") {
    setInterval(GetItemsFromLocal, 1000);
  }

  const getMessagesByScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as Element;
    if (target.scrollTop === 0) {
      setMessagesSlice(messagesSlice + 5);
    }
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messagesFromLocal.length]);
  return (
    <div className="message__list">
      <div className="messages" onScroll={getMessagesByScroll}>
        {messagesFromLocal.slice(-messagesSlice).map((item) => (
          <PostMessage key={item.id * Math.random()} item={item} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
