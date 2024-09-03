import React from "react";

type InputProps = {
    name:string;
    value?:string;
    type?:string;
    onChange?:(e:any) => void;
    className?:string;
    onKeyDown?:(e:any) => void;
    disabled?:boolean;
};

const Input = ({
    name,
    value,
    type = "text",
    onChange,
    className,
    onKeyDown,
    disabled,

}: InputProps) => {
    return(
     <input 
     value={value}
     onChange={onChange}
     onKeyDown={onKeyDown}
     type={type}
     disabled={disabled}
     placeholder={`Enter ${name}`}
     className={`flex-1 placeholder-gray-300 bg-transparent py-1 px-3 border-2 border-gray-300 rounded-full ${className}`}
   />
 );
};

export default Input;