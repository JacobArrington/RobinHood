import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

import "./LandingPage.css"


function LandingPage() {
   const dispatch = useDispatch();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");


   // const demoSubmit = () => {
   //    setEmail("demo@aa.io");
   //    setPassword("password");
   //    return dispatch(login({ email, password }));
   // }

   return (
      <>
         <h1>Welcome To AppExchange</h1>

      </>
   )
}

export default LandingPage;
