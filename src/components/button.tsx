import React from "react";
import Spinner from "./Spinner";

type ButtonProps = {
    text?:string;
    className?:string;
    secondary?:any;
    onclick?:() => void;
    loading?:boolean;
}

 function Button({
    text= "Button",
    className,
    secondary,
    onclick,
    loading= false,
}: ButtonProps) {
    return(
  <button className={`py-2 px-9 flex items-center justify-center gap-3 rounded-full text-white border-2 border-white hover:bg-myPink transition-all hover:drop-shadow-lg ${
    secondary ? "bg-myPink" : "bg-myBlue"
} ${className} ${loading && "cursor-wait"}`}
 onClick={onclick}
 disabled={loading}
  >
  {loading && <Spinner/>}
     {text}
  </button>
 );
 };

 export default Button;