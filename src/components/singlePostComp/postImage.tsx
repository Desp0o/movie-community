import React from 'react'
import "./singlePostComp.css"

interface PostImageImage {
    image: string;
    type: number | string;
    funName?: () => void
}

const imageStoragePath = import.meta.env.VITE_IMAGE_PATH
const questionImage = import.meta.env.VITE_QUESTION_IMAGE

const PostImage: React.FC<PostImageImage> = ({image, type, funName}) => {
  return (
    <div className='single_post_image_container' onClick={funName}>
        <img src={`${type === 1 ? imageStoragePath : questionImage}${image}.webp`} alt='post cover' className='single_post_cover' />
        <img src={`${type === 1 ? imageStoragePath : questionImage}${image}.webp`} alt='post image' className='single_post_img' />
    </div>
  )
}

export default PostImage