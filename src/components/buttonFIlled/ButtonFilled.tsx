import React from 'react'
import "./ButtonStyles.css"
import { Link } from 'react-router-dom';

interface ButtonFIlledProps {
    text: string;
    link: string;
    faded?: boolean
    wProp?: string;
}

const ButtonFIlled: React.FC<ButtonFIlledProps> = ({text, link, faded, wProp}) => {
  return (
    <Link to={link}>
        <div className={faded ? "ButtonFIlled faded" : "ButtonFIlled"} style={{width: wProp ? wProp : ""}}>
          <p>{text}</p>
        </div>
    </Link>
  )
}

export default ButtonFIlled