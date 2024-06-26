import React from 'react'

import { deleteComment } from './DELcomment'

interface SettingForCommentProps {
  commentID: number;
  refetchCallbac: ()=>void
}

const SettingForComment:React.FC<SettingForCommentProps> = ({commentID, refetchCallbac}) => {


  return (
    <div className='SettingForComment'>
        <p className='SettingForComment_edit'>Edit</p>
        <p className='SettingForComment_delete' onClick={()=>deleteComment(commentID, refetchCallbac)}>Delete</p>
    </div>
  )
}

export default SettingForComment