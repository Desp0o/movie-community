import React from "react";
import "./singlePostComp.css";
import noAvatar from "../../assets/noAvatar.jpeg";

interface AuthorProps {
  avatar: string;
  name: string;
  date: string;
}

const Author: React.FC<AuthorProps> = ({ avatar, name, date }) => {
  const dateObject = new Date(date);

  const day = dateObject.getUTCDate().toString().padStart(2, "0");
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getUTCFullYear();
  const formattedDate = day + "-" + month + "-" + year;

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

      <p>{formattedDate}</p>
    </div>
  );
};

export default Author;
