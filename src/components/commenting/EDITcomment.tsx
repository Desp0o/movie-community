import axios from "axios";
import { SetStateAction } from "react";

const token = localStorage.getItem("token");

export const editComment = async (callback:()=>void, comID: number, commentValue: unknown, setter: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }, editTextArea:boolean) => {
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
      setter(!editTextArea);
    } catch (error: unknown) {
      console.error(error);
    }
  };