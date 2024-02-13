import {BrowserRouter as Router, Routes,Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {ProtectedRoute} from 'protected-route-react'
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Profile from "./components/Profile/Profile"
import UpdateProfile from "./components/Profile/UpdateProfile"
import Loader from "./components/Layout/Loader/Loader"
import { loadUser } from "./redux/actions/user";
import ChangePassword from "./components/Profile/ChangePassword";
import Upload from "./components/Upload/Upload";
function App() {
  window.addEventListener("contextmenu",e=>{
    e.preventDefault();
  });
  const {isAuthenticated,user,message,error,loading}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch({type:"clearError"});
    }
    if(message){
      toast.success(message);
      dispatch({type:"clearMessage"});
    }
},[dispatch,error,message])

useEffect(()=>{
  dispatch(loadUser());
},[dispatch]);
  return <Router>{
    loading?(<Loader/>):(
      <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated}> <Profile user={user}/></ProtectedRoute>}/>
        <Route path='/updateprofile' element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdateProfile user={user}/></ProtectedRoute>}/>
        <Route path='/login' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'><Login /></ProtectedRoute>}/>
        <Route path='/register'element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'><Register /></ProtectedRoute>}/> 
        <Route path='/changepassword' element={<ProtectedRoute isAuthenticated={isAuthenticated}> <ChangePassword user={user}/></ProtectedRoute>}/>
        <Route path='/upload' element={<ProtectedRoute isAuthenticated={isAuthenticated}> <Upload user={user}/></ProtectedRoute>}/>
      </Routes>
    </>
        )
      }
  </Router>
}

export default App;
