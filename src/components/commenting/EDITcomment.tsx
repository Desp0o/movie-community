import axios from "axios";

const token = localStorage.getItem("token");

export const editComment = async (refetchCallback:()=>void, comID: number, commentValue: unknown, setter: void) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_EDIT_COMMENT}${comID}`,
        commentValue,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setter
      refetchCallback()
    } catch (error: unknown) {
      console.error(error);
    }
  };
