import React from 'react'
import { Link } from 'react-router-dom'
import "./ButtonStyles.css"

interface ButtonOutlinedProps {
    text: string;
    link: string;
    faded?: boolean;
}

const ButtonOutlined: React.FC<ButtonOutlinedProps> = ({ text, link, faded }) => {
    return (
        <Link to={link}>
            <div className={faded ? "ButtonOutlined faded" : "ButtonOutlined"}>
                <p>{text}</p>
            </div>
        </Link>
    )
}

export default ButtonOutlined