import React from "react";
import { useAppSelector } from "../../app/hooks";
import { IStoreMessages } from "../../app/storeSlice";

interface IPostMessageProps {
  item: IStoreMessages;
}

const PostMessage: React.FC<IPostMessageProps> = ({ item }) => {
  const post = useAppSelector((state) => state.data);

  return (
    <div className={post.name !== item.name ? "post__message" : "my__post"}>
      <p>{item.name}</p>
      <span>{item.message}</span>
    </div>
  );
};

export default PostMessage;
