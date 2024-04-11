import React from 'react'

interface SendPostBTNProps {
    funName?: ()=>void | undefined
}

const SendPostBTN:React.FC<SendPostBTNProps> = ({funName}) => {
  return (
    <div className='send_post_btn' onClick={funName}><p>დაამატე</p></div>
  )
}

export default SendPostBTN