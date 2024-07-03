import axios from "axios";


export const likeComment = async (comID: number) => {
  const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_COMMENT_LIKING}${comID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

