import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LandingPage.css"


function LandingPage() {
   const dispatch = useDispatch();
   const sessionUser = useSelector((state) => state.session.user);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");


   if (sessionUser) return <Redirect to="/portfolio" />;

   const demoSubmit = () => {
      setEmail("demo@aa.io");
      setPassword("password");
      return dispatch(login( email, password ));
   }

   return (
      <>
         <h1>Welcome To AppExchange</h1>
         <button onClick={demoSubmit}>
            DemoUser
         </button>
      </>
   )
}

export default LandingPage;
