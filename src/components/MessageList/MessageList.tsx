import React, { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { IStoreMessages } from "../../app/storeSlice";
import PostMessage from "../PostMessage/PostMessage";

const MessageList: React.FC = () => {
  const [messagesSlice, setMessagesSlice] = useState<number>(25);
  const stateData = useAppSelector((store) => store.data);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messagesFromLocal, setMessagesFromLocal] = useState<IStoreMessages[]>(
    stateData.data
  );

  const GetItemsFromLocal = () => {
    const history = localStorage.getItem(stateData.chat);
    if (history) {
      const messages = JSON.parse(history);
      setMessagesFromLocal(messages);
    }
  };

  const getMessagesByScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as Element;
    if (target.scrollTop === 0) {
      setMessagesSlice(messagesSlice + 5);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (stateData.name) {
    setInterval(GetItemsFromLocal, 1000);
  }

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
