import React, { useEffect, useState } from "react";
import "./singlePostComp.css";
import noAvatar from "../../assets/noAvatar.jpeg";

interface AuthorProps {
  avatar: string;
  name: string;
  date: string;
}

const Author: React.FC<AuthorProps> = ({ avatar, name, date }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTimeAgo = () => {
      const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

      let interval = Math.floor(seconds / 31536000);
      if (interval > 1) {
        setTimeAgo(`${interval} years ago`);
        return;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        setTimeAgo(`${interval} months ago`);
        return;
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        setTimeAgo(`${interval} days ago`);
        return;
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        setTimeAgo(`${interval} hours ago`);
        return;
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        setTimeAgo(`${interval} minutes ago`);
        return;
      }

      interval = Math.floor(seconds / 60);
      if (interval > 0) {
        setTimeAgo(`${interval} minutes ago`);
        return;
      }
      setTimeAgo(`Just now`);
    };

    updateTimeAgo();

    const intervalId = setInterval(updateTimeAgo, 60000);

    return () => clearInterval(intervalId);
  }, [date]);

  return (
    <div className="author">
      <div className="author_credentials">
        <img
          src={avatar ? avatar : noAvatar}
          alt="author avatar"
          className="author_avatar"
        />
        <p>{name}</p>
      </div>

      <span
        className="span_dot"
        style={{ backgroundColor: "currentColor" }}
      ></span>

      <p>{timeAgo}</p>
    </div>
  );
};

export default Author;
