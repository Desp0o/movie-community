import axios from "axios";
import { SetStateAction } from "react";

const token = localStorage.getItem("token");

export const editComment = async (comID: number, commentValue: any, setter: { (value: SetStateAction<number | null>): void; (arg0: null): void; }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_EDIT_COMMENT}${comID}`,
        commentValue,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setter(null); // Reset editing state after successful edit
    } catch (error) {
      console.error(error);
    }
  };