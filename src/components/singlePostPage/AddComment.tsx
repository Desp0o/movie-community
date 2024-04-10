import { SetStateAction, useState } from 'react';
import { useUserHook } from '../../hooks/useUserHook';
import { useDispatch } from 'react-redux';
import { setModalVisible } from '../../Redux/loginModalSlicer';

const AddComment = () => {
  const [text, setText] = useState('');
  const { user } = useUserHook()
  const disptach = useDispatch()

  const handleChange = (event: { target: { value: SetStateAction<string>; style: { height: string; }; scrollHeight: any; }; }) => {
    setText(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const logInHandler = () => {
    disptach(setModalVisible(true))
  }

  if(!user.name){
    return <p>please <span onClick={logInHandler} style={{color: 'var(--reddit)', cursor:"pointer"}}>log in</span> to leave comment.</p>
  }

  return (
    <div className='comment_container'>
        <textarea
        className="comment_textarea"
        value={text}
        onChange={handleChange}
        placeholder="Write your comment here..."
        />

    <button className='comment_ntm'>add comment</button>
    </div>
  );
};

export default AddComment;
