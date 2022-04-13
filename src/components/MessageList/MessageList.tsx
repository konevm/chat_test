import React, { useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import PostMessage from "../PostMessage/PostMessage";

const MessageList: React.FC = () => {
  const [messagesSlice, setMessagesSlice] = useState<number>(-25);
  const allMessages = useAppSelector((store) => store.data.data);
  const messages = allMessages.slice(messagesSlice);
  const messagesUpRef = useRef<HTMLDivElement>(null);
  console.log(messagesUpRef.current?.scrollHeight);

  const getMessagesByScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as Element;
    if (target.scrollTop === 0) {
      setMessagesSlice(messagesSlice - 5);
    }
  };

  return (
    <div className="message__list">
      <div className="messages" onScroll={getMessagesByScroll}>
        {messages.map((item) => (
          <PostMessage key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
