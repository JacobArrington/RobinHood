import React, { useEffect, useState } from "react";
import { authenticate, demoLogin } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LandingPage.css"


function LandingPage() {
   const dispatch = useDispatch();
   const sessionUser = useSelector((state) => state.session.user);
   const [isLoaded, setIsLoaded] = useState(false)
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");


   if (sessionUser) return <Redirect to="/portfolio" />;

   // const demoSubmit = () => {
   //    setEmail("demo@aa.io");
   //    setPassword("password");
   //    console.log(email, password)
   //    dispatch(login( email, password ));
   // }

   const demoSubmit = () => {
      dispatch(demoLogin())
   }

   return (
      <div className="welcome">
         <h1 className="fade-in-text">AppExchange</h1>
         <i className="fa fa-solid fa-feather fa-bounce" onClick={demoSubmit}></i>
         {/* <i className="fa fa-solid fa-feather fa-beat-fade"></i> */}
         {/* <i className="fa fa-solid fa-feather fa-2xl"></i> */}
      </div>
   )
}

export default LandingPage;
