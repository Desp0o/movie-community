import React, { useEffect, useState } from 'react'
import IconBlock from './IconBlock'
import { bookmarkIcon, bookmarkIconFilled } from '../../assets/newSvg/bookmarkIcon'
import { useUserHook } from '../../hooks/useUserHook'
import { useSavePost } from './likeFunction/SaveFunction'
import { useLoginModal } from '../../hooks/useLoginModal'

interface BookmarkPostProps{
    mySave: number;
    postID: number;
}

const BookmarkPost:React.FC<BookmarkPostProps> = ({mySave, postID}) => {
    const {user} = useUserHook()
    const { handleVisibility } = useLoginModal()
    const { mutate } = useSavePost();

    const [saveIcon, setSaveIcon] = useState(mySave === 1 ? bookmarkIconFilled : bookmarkIcon)
    const [bookmarkActive, setBookmarkActive] = useState(mySave === 1 ? true : false)

    const saveInBookMark =() => {
        if(user.userID && user.name){
         mutate(postID)
         setBookmarkActive(!bookmarkActive)
     
         if(bookmarkActive){
           setSaveIcon(bookmarkIcon)
         }else{
           setSaveIcon(bookmarkIconFilled)
         }
        }else{
          handleVisibility()
        }
       }
     
       //update bookmark icon change
       useEffect(()=>{
         if(mySave === 1){
           setSaveIcon(bookmarkIconFilled)
           setBookmarkActive(true)
         }else{
           setSaveIcon(bookmarkIcon)
           setBookmarkActive(false)
         }
       },[mySave])

  return (
    <span onClick={saveInBookMark}>
    <IconBlock icon={saveIcon} displayNone={true}/>
  </span>
  )
}

export default BookmarkPost