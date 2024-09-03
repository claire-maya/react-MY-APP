import {createSlice, current} from "@reduxjs/toolkit"
import { userType } from "../Types";

export const defaultUser:userType = {
    id:"",
    isOnline:false, 
    img:"",
    username:"", 
    email:"",
    creationTime:"", 
    lastSeen:"",
    bio:"",
};

const initialState = {
 //user:[],
 currentUser:defaultUser,
 //SelectedCurrentUser:null
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state, action) =>{
            
            // set loged user
            state.currentUser = action.payload
        },
        setUsers:(state,action) =>{
         // set all users
        },
    },
});


export const {setUser, setUsers} = userSlice.actions

export default userSlice.reducer