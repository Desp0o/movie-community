import React, { MouseEventHandler } from 'react'

import { deleteComment } from './DELcomment'
import { smallXicon } from '../../assets/newSvg/smallXicon';

interface SettingForCommentProps {
  commentID: number;
  refetchCallbac: ()=>void
  editCom: MouseEventHandler<HTMLParagraphElement>
}

const SettingForComment:React.FC<SettingForCommentProps> = ({commentID, refetchCallbac, editCom}) => {


  return (
    <div className='SettingForComment'>
      <span className='SettingForComment_X'>{smallXicon}</span>
        <p className='SettingForComment_edit' onClick={editCom}>Edit commnet</p>
        <p className='SettingForComment_delete' onClick={()=>deleteComment(commentID, refetchCallbac)}>Delete comments</p>
    </div>
  )
}

export default SettingForComment