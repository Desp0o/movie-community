import axios from "axios";


export const deleteComment = async (comID: number, callback: ()=>void) => {
  const token = localStorage.getItem("token");

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

