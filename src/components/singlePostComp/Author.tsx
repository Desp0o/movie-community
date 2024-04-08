import React from 'react'
import "./singlePostComp.css"

interface AuthorProps {
    avatar: string;
    name: string;
}

const Author:React.FC<AuthorProps> = ({avatar, name}) => {

  return (
    <div className='author'>
       <div className='author_credentials'>
            <img src={avatar} alt='author avatar' className='author_avatar' />
            <p>{name}</p>
       </div>

       <span className='span_dot' style={{backgroundColor: 'currentColor'}}></span>

       <p>თარიღი</p>
    </div>
  )
}

export default Author