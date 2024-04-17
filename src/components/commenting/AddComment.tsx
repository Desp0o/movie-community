import React, { SetStateAction, useState } from 'react';
import { useUserHook } from '../../hooks/useUserHook';
import { useDispatch } from 'react-redux';
import { setModalVisible } from '../../Redux/loginModalSlicer';
import axios from 'axios';

interface addCommentProps{
  postID: number | undefined | string;
}

const AddComment:React.FC<addCommentProps> = ({postID}) => {
  const token = localStorage.getItem('token')
  const [commentValue, setCommentValue] = useState({
    img: "",
    text: ""
  })
  const { user } = useUserHook()
  const disptach = useDispatch()

  const handleChange = (event: { target: { value: SetStateAction<string>; style: { height: string; }; scrollHeight: number; }; }) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleCommentValues = (event: any) => {
    setCommentValue({...commentValue, text: event.target.value})
  }

  //თუ არ არის ავტორიზებული გამოუჩინოს ლოიგნის პანელი
  const logInHandler = () => {
    disptach(setModalVisible(true))
  }

  if(!user.name){
    return <p>please <span onClick={logInHandler} style={{color: 'var(--reddit)', cursor:"pointer"}}>log in</span> to leave comment.</p>
  }

  const addComment = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_ADD_COMMENT}${postID}`, commentValue,{
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":'multipart/form-data, application/json, text/plain, */*'
        }})

        console.log(response);
        
      
    } catch (error) {
      console.error(error);
      
    }
  }

  return (
    <div className='comment_container'>
        <textarea
        className="comment_textarea"
        value={commentValue.text}
        onChange={(event) => {
          handleChange(event);
          handleCommentValues(event);
        }}
        placeholder="Write your comment here..."
        />

    <button className='comment_ntm' onClick={addComment}>add comment</button>
    </div>
  );
};

export default AddComment;
