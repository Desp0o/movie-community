import axios from "axios";

const token = localStorage.getItem("token");

export const deleteComment = async (comID: number, callback: ()=>void) => {
    try {
      await axios.get(
        `${import.meta.env.VITE_DEL_COMMENT}${comID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      callback()
    } catch (error) {
      console.error(error);
    }
  };

