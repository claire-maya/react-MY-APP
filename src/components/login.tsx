import React, {useState} from "react";
import Input from "./input";
import Button from "./button";
import { BE_signUp } from "../Backend/Queries";
import { BE_signIn } from "../Backend/Queries";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { authDataType } from "../Types";

const Login = () => {
const [login, setLogin] = useState(true);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [signUpLoading, setsignUpLoading] = useState(false);
const [signInLoading, setsignInLoading] = useState(false);
const goTo = useNavigate();
const dispatch = useDispatch<AppDispatch>()


const handleSignup = () => {
  const data = {email, password, confirmPassword};
  auth(data,  BE_signUp, setsignUpLoading)
};
const handleSignin = () => {
  const data = {email, password};
  auth(data,  BE_signIn, setsignInLoading)
};

 const auth = (
  data: authDataType,
  func:  any,
  setLoading:React.Dispatch<React.SetStateAction<boolean>>
) => {
  func(data, setsignInLoading, reset, goTo, dispatch)
};

const reset = () => {
  setEmail ("");
  setPassword ("");
  setConfirmPassword ("");
};

 return(
  <div className="w-full md:w-[450px]">
    <h1 className="text-white text-center font-bold text-4xl md:text-6xl mb-10">
     {login ? "Login" : "Register"}
    </h1>
    <div className=" flex flex-col gap-3 bg-white w-full p-6 min-h-[150px] rounded-xl drop-shadow-xl">
        <Input  
        name="email"
        type="email" 
        value={email}
        onChange={e => setEmail(e.target.value)} 
     />
      <Input
        name="password" 
        type="password" 
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
     {!login && (
      <Input 
        name="confirm-password" 
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)} 
        /> 
      )}
   {login ? 
   (<>
    <Button text="Login"
     onclick={handleSignin} 
     loading={signInLoading}
      />
    <Button onclick={() => setLogin(false)} text="Register" secondary/>
      </>
   ) :(
    <> 
    <Button text="Register" 
      onclick={handleSignup}
      loading={signUpLoading}
    />
    <Button onclick={() => setLogin(true)} text="Login" secondary/>
   </>
   )}        
             
            
 </div>
 </div>
 );

};

export default Login;