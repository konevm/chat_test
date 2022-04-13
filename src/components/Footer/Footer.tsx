import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setMessage, setHistory } from "../../app/storeSlice";

const Footer: React.FC = () => {
  const nameOfUser = useAppSelector((state) => state.data.name);
  const dispatch = useAppDispatch();
  const [postMessage, setPostMessage] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameOfUser === "") {
      dispatch(setHistory(postMessage));
    } else {
      dispatch(setMessage(postMessage));
    }
    setPostMessage("");
  };
  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPostMessage(target.value);
  };

  return (
    <div className="footer">
      <form action="" method="post" onSubmit={onSubmit}>
        <input type="text" value={postMessage} onChange={onInputChange} />
        <button type="submit">{nameOfUser !== "" ? "Post" : "Set name"}</button>
      </form>
    </div>
  );
};

export default Footer;
