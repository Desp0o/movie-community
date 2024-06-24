import React from 'react'
import { Link } from 'react-router-dom'
import { arrowLeft } from '../../assets/newSvg/arrowLeft';

interface ButtonArrowProps {
    link: string;
    faded?: boolean
    wProp?: string;
}

export const ButtonArrow:React.FC<ButtonArrowProps> = ({link, faded, wProp}) => {
  return (
    <Link to={link}>
        <div className={faded ? "ButtonArrow faded" : "ButtonArrow"} style={{width: wProp ? wProp : ""}}>
          {arrowLeft}
        </div>
    </Link>
  )
}
