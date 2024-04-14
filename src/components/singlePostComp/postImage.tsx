import React from 'react'
import "./singlePostComp.css"

interface PostImageImage {
    image: string;
    funName?: () => void
}

const imageStoragePath = import.meta.env.VITE_IMAGE_PATH

const PostImage: React.FC<PostImageImage> = ({image, funName}) => {
  return (
    <div className='single_post_image_container' onClick={funName}>
        <img src={`${imageStoragePath}${image}.webp`} alt='post cover' className='single_post_cover' />
        <img src={`${imageStoragePath}${image}.webp`} alt='post image' className='single_post_img' />
    </div>
  )
}

export default PostImage