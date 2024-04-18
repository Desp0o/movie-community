import axios from "axios";
import { SetStateAction } from "react";

const token = localStorage.getItem("token");

export const editComment = async (callback:()=>void, comID: number, commentValue: unknown, setter: { (value: SetStateAction<number | null>): void; (arg0: null): void; }) => {
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
      callback()
      setter(null);
    } catch (error: unknown) {
      console.error(error);
    }
  };