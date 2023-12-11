import React, { useEffect } from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../Api-Helpers/api-helpers'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'
import {useNavigate, redirect} from 'react-router-dom'
import {useState} from 'react'
import UnAuthorized from "./UnAuthorized"


const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [caughtError, setCaughtError] = useState(false);
  const changeError =()=>{
    setCaughtError(!caughtError);
  }
  const onResReceived = (data) =>{
    // console.log(data);
    redirect("/");
    dispatch(userActions.login());
    localStorage.setItem("userId", data._id);
    navigate(0)
  }
  const getData = (data) => {
    sendUserAuthRequest(data.inputs, data.signup)
    .then(onResReceived)
    .catch((err) => {console.log(err); setCaughtError(true)});
  }
  const isUserLoggedIn = localStorage.getItem("userId") ? true : false;
  const isAdminLoggedIn = localStorage.getItem("adminId") ? true : false;
  useEffect(()=>{
    if(isUserLoggedIn || isAdminLoggedIn){
      navigate("/");
    }
  },[])
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false}/>
      {caughtError && <UnAuthorized changeError={changeError}></UnAuthorized>}
    </div>
  )
}
 
export default Auth