import React from 'react'
import "./ButtonStyles.css"
import { Link } from 'react-router-dom';

interface ButtonFIlledProps {
    text: string;
    link: string;
    faded?: boolean
}

const ButtonFIlled: React.FC<ButtonFIlledProps> = ({text, link, faded}) => {
  return (
    <Link to={link}>
        <div className={faded ? "ButtonFIlled faded" : "ButtonFIlled"}>
          <p>{text}</p>
        </div>
    </Link>
  )
}

export default ButtonFIlled