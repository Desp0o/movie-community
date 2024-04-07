import React from 'react'

interface PostImageImage {
    image: string;
}

const PostImage: React.FC<PostImageImage> = ({image}) => {
  return (
    <div className='single_post_image_container'>
        <img src={image} alt='post cover' className='single_post_cover' />
        <img src={image} alt='post image' className='single_post_img' />
    </div>
  )
}

export default PostImage