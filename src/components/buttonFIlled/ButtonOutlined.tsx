import React from 'react'
import { Link } from 'react-router-dom'
import "./ButtonStyles.css"

interface ButtonOutlinedProps {
    text: string;
    link: string;
    faded?: boolean;
    wProp?: string;
}

const ButtonOutlined: React.FC<ButtonOutlinedProps> = ({ text, link, faded, wProp }) => {
    return (
        <Link to={link}>
            <div className={faded ? "ButtonOutlined faded" : "ButtonOutlined"} style={{width: wProp ? wProp : ""}}>
                <p>{text}</p>
            </div>
        </Link>
    )
}

export default ButtonOutlined