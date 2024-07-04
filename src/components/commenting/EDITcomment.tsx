import axios from "axios";


export const editComment = async (refetchCallback:()=>void, comID: number, commentValue: unknown, setter: void) => {
  const token = localStorage.getItem("token");
    try {
     const res =  await axios.post(
        `${import.meta.env.VITE_EDIT_COMMENT}${comID}`,
        commentValue,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setter
      console.log(res);
      
      refetchCallback()
    } catch (error: unknown) {
      console.error(error);
    }
  };
