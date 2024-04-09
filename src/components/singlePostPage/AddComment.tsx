import { SetStateAction, useState } from 'react';

const AddComment = () => {
  const [text, setText] = useState('');

  const handleChange = (event: { target: { value: SetStateAction<string>; style: { height: string; }; scrollHeight: any; }; }) => {
    setText(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <div>
        <textarea
        className="comment_textarea"
        value={text}
        onChange={handleChange}
        placeholder="Write your comment here..."
        />
    </div>
  );
};

export default AddComment;
