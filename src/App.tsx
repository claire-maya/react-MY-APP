import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/Loginpage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import ListPage from "./pages/ListPage";
import Layout from "./pages/Layout";

function App(){
  return (
   <BrowserRouter>
     <Routes>    
       <Route path="/auth" element={<LoginPage />} /> 
       <Route path="/dashboard" element={<Layout />} >
       <Route index element={<ListPage/>} />
          <Route path="chat" element={<ChatPage/>}/>
          <Route path="profile" element={<ProfilePage/>}/>
       </Route>
       <Route path="*" element={<Navigate to="/dashboard" />} />
     </Routes>
   </BrowserRouter>
  );
};
export default App;

