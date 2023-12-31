import "./App.css";
import {useEffect} from "react";
import {useSelector, useDispatch } from "react-redux"
import {Route, Routes} from "react-router-dom";

import Header from "./components/Header.jsx";
import Homepage from "./components/Homepage.jsx";
import Movies from "./components/Movies/Movies";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";

import { adminActions, userActions } from "./store";
import Booking from "./components/Bookings/Booking";
import UserProfile from "./Profile/UserProfile";
import AddMovies from "./components/Movies/AddMovies";
import AdminProfile from "./Profile/AdminProfile";
import { CssBaseline } from "@mui/material";
import UnAuthorized from "./components/Auth/UnAuthorized.jsx";
import PageNotFound from "./components/PageNotFound.jsx";



const app = () =>{
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

    console.log("isAdminLoggedIn: ", isAdminLoggedIn);
    console.log("isUserLoggedIn: ", isUserLoggedIn);

    useEffect(() => {
      if (localStorage.getItem("userId")) {
        dispatch(userActions.login());
      } else if (localStorage.getItem("adminId")) {
        dispatch(adminActions.login());
      }
    });

     return (
       <div>
         <CssBaseline />
         <Header />
         <section>
           <Routes>
             <Route path="/" element={<Homepage />} />
             <Route path="/movies" element={<Movies />} />
             <Route path="/admin" element={<Admin />} />
             <Route path="/auth" element={<Auth />} />
             <Route path="/booking/:id" element={<Booking />} />
             <Route path="/user" element={<UserProfile />} />
             <Route path="/add" element={<AddMovies />} />
             <Route path="/user-admin" element={<AdminProfile />} />
             <Route path="/unauthorized" element={<UnAuthorized />} />
             <Route path="*" element={<PageNotFound />} />
           </Routes>
         </section>
       </div>
     );
}
export default app;