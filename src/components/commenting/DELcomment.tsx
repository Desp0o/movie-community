import axios from "axios";

const token = localStorage.getItem("token");

export const deleteComment = async (comID: number) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEL_COMMENT}${comID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

