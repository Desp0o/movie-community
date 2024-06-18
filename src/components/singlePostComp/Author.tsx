import React from "react";
import "./singlePostComp.css";
import DateFormater from "../dateFormater/DateFormater";
import { noAvatar } from "../../assets/newSvg/noAvatar";

interface AuthorProps {
  avatar?: string;
  name?: string;
  date?: string;
}

const Author: React.FC<AuthorProps> = ({ avatar, name, date }) => {


  return (
    <div className="author">
      <div className="author_credentials">
        {avatar ? <img
          src={avatar}
          alt="author avatar"
          className="author_avatar"
        /> : noAvatar}
        <p>{name}</p>
      </div>

      {date && <DateFormater date={date} />}
    </div>
  );
};

export default Author;
