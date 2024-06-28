import React from 'react'

import { deleteComment } from './DELcomment'
import { smallXicon } from '../../assets/newSvg/smallXicon';

interface SettingForCommentProps {
  commentID: number;
  refetchCallbac: ()=>void
}

const SettingForComment:React.FC<SettingForCommentProps> = ({commentID, refetchCallbac}) => {


  return (
    <div className='SettingForComment'>
      <span className='SettingForComment_X'>{smallXicon}</span>
        <p className='SettingForComment_edit'>Edit commnet</p>
        <p className='SettingForComment_delete' onClick={()=>deleteComment(commentID, refetchCallbac)}>Delete comments</p>
    </div>
  )
}

export default SettingForComment