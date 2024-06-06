import React from "react";
import "./singlePostComp.css";
import noAvatar from "../../assets/noAvatar.jpeg";
import DateFormater from "../dateFormater/DateFormater";

interface AuthorProps {
  avatar?: string;
  name: string;
  date: string;
}

const Author: React.FC<AuthorProps> = ({ avatar, name, date }) => {


  return (
    <div className="author">
      <div className="author_credentials">
       {avatar &&  <img
          src={avatar ? avatar : noAvatar}
          alt="author avatar"
          className="author_avatar"
        />}
        <p>{name}</p>
      </div>

      <DateFormater date={date} />
    </div>
  );
};

export default Author;
