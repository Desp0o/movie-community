import React from 'react'
import { Link } from 'react-router-dom'

interface SeeMoreProps {
    postID: number;
}

const SeeMore:React.FC<SeeMoreProps> = ({postID}) => {
  return (
    <Link to={`/pages/Post/${postID}`}>
        <p>See More</p>
    </Link>
  )
}

export default SeeMore