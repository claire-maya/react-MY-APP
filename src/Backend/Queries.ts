import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase";
import CatchErr from "../Utils/CatchErr";
import { toastErr } from "../Utils/toast";
import { authDataType, setLoadingType, userType } from "../Types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { defaultUser, setUser } from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";

// collection names
const usersColl = "users";
const tasksColl = "tasks";
const taskListColl = "taskList";
const chatsColl = "chats";
const messagesColl = "messages";

// register
export const BE_signUp = (
  data: authDataType ,
 setLoading: setLoadingType,
 reset: () => void,
 goTo: NavigateFunction,
 dispatch:AppDispatch
) => {
  const { email, password, confirmPassword } = data;
  // loading true
  setLoading(true);
  if (email && password) {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ( {user} ) => {
          const userInfo = await addUserToCollection(
            user.uid, 
            user.email || "",
            user.email?.split("@")[0] || "",
            "imgLink"
            );

            //  set userinfo in store and local storage
            dispatch(setUser(userInfo));
         

          setLoading(false);
          reset();
          goTo("/dashboard");
        })
        .catch((err) => {
          CatchErr(err);
          setLoading(false);
        });
    } else toastErr("Password must match!", setLoading);
  } else toastErr("Fields shouldn't be left empty!", setLoading);
};
export const BE_signIn = (
  data: authDataType,
 setLoading: setLoadingType,
 reset: () => void,
 goTo: NavigateFunction,
 dispatch:AppDispatch
) => {

 const {email, password} = data;
  //loading true
 setLoading(true);


 signInWithEmailAndPassword(auth, email, password)
   .then(async ({ user }) => {

    //TODO: update user id online to true

    //get user info
     const userInfo =  await getUserInfo(user.uid)
     //  set userinfo in store and local storage
    dispatch(setUser(userInfo));
     setLoading(false);
      reset();
      goTo("/dashboard");
   })
  .catch((err) => {
    CatchErr(err);
    setLoading(false);  
   });
};
const addUserToCollection = async (
  id:string,
  email:string,
  username:string,
  img:string
    ) => {
      // user at userid
  await setDoc(doc(db, "usersColl", id), {
    isOnline: true,
    img,
    username,
    email,
    creationTime: serverTimestamp(),
    lastSeen: serverTimestamp(),
    bio:`hi my name is ${username} thanks to desmond i now understand react and typescript`,
  });
  return getUserInfo(id)
};

const getUserInfo = async (
  id:string
):Promise<userType>=> {

  const userRef = doc(db, usersColl, id);
  const user = await getDoc(userRef);

  if (user.exists()){
     const { isOnline, img, username, email,  creationTime, lastSeen, bio} = user.data()

     return{
      id:user.id,
      isOnline, 
      img,
      username, 
      email,
      creationTime, 
      lastSeen,
      bio,
     };
  } else{
     toastErr("getUserInfo: user not found");
      return defaultUser;
  }
} ;