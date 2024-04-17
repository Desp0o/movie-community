import axios from "axios";
import React from "react";

interface Comment {
  id: number;
  text: string;
  img: string;
  // Add more properties if needed
}

interface ComProps {
  fetchedComments: Comment[];
}

const CommentsSection: React.FC<ComProps> = ({ fetchedComments }) => {
  const imageStoragePath = import.meta.env.VITE_COMMENT_IMAGE;
  const token = localStorage.getItem('token');

  const deleteComment = async (comID: string | number) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_DEL_COMMENT}${comID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {fetchedComments?.map((item) => (
        <div key={item.id} onClick={() => deleteComment(item.id)}>
          <p>{item.text}</p> 
        {item.img ? <img style={{ width: "50px" }} src={`${imageStoragePath}${item.img}.webp`} alt="Comment" /> : <></>}  
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
