import React from "react";
import "./inputStyles.css";

interface inputProps {
  type: string;
  autoComplete: string;
  placeholder: string;
  value: string;
  isError: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  widthProp?: string;
  heightProp?: string;
}
const InputComponent: React.FC<inputProps> = ({
  type,
  autoComplete,
  placeholder,
  value,
  isError,
  onChange,
  widthProp,
  heightProp
}) => {
  return (
    <input
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      className={isError ? "input_style error" : "input_style"}
      value={value}
      onChange={onChange}
      required
      style={{width:`${widthProp}`, height:`${heightProp}`}}
    />
  );
};

export default InputComponent;
