import React from 'react'
import { Link } from 'react-router-dom'
import "./ButtonStyles.css"

interface ButtonOutlinedProps {
    text: string;
    link: string;
}

const ButtonOutlined: React.FC<ButtonOutlinedProps> = ({ text, link }) => {
    return (
        <Link to={link}>
            <div className='ButtonOutlined'>
                <p>{text}</p>
            </div>
        </Link>
    )
}

export default ButtonOutlined