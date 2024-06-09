import React from 'react'
import { Link } from 'react-router-dom'

interface ButtonOutlinedProps {
    text: string;
    link: string;
}

const ButtonOutlined: React.FC<ButtonOutlinedProps> = ({ text, link }) => {
    return (
        <Link to={link}>
            <div className='ButtonOutlined'>{text}</div>
        </Link>
    )
}

export default ButtonOutlined