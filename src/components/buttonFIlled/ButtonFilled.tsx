import React from 'react'
import "./ButtonStyles.css"
import { Link } from 'react-router-dom';

interface ButtonFIlledProps {
    text: string;
    link: string;
}

const ButtonFIlled: React.FC<ButtonFIlledProps> = ({text, link}) => {
  return (
    <Link to={link}>
        <div className='ButtonFIlled'>
          <p>{text}</p>
        </div>
    </Link>
  )
}

export default ButtonFIlled