import React, { useEffect, useState } from "react";
import AuthForm from '../Auth/AuthForm'
import { sendAdminAuthRequest } from '../../Api-Helpers/api-helpers';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions } from '../../store';
import UnAuthorized from "../Auth/UnAuthorized";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const dispatch = useDispatch();
  const onResReceived = (data) =>{
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data._id);
    localStorage.setItem("token", data.token);
    navigate(0);
  }

  const [caughtError, setCaughtError] = useState(false);
  const changeError = () => {
    setCaughtError(!caughtError);
  };
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
    .then(onResReceived)
    .catch((err) => {console.log(err); setCaughtError(true)})
  }
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("adminId") ? true : false;
    if (isAdminLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
      {caughtError && <UnAuthorized changeError={changeError}></UnAuthorized>}
    </div>
  )
}

export default Admin