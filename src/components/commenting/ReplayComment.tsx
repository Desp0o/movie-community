import axios from 'axios';
import React from 'react'

interface ReplayCommentProps {
    commentID: number;
}

const ReplayComment: React.FC<ReplayCommentProps> = ({commentID}) => {

  const sendReplay = async () => {
    const token = localStorage.getItem('token')

    try {
        const res = await axios.post('','',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        console.log(res);
        
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <div>ReplayComment</div>
  )
}

export default ReplayComment