import React, { useEffect, useState } from "react";
import { authenticate, demoLogin } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import About from "../about";
import Ticker from "../Ticker"
import "./LandingPage.css"


function LandingPage() {
   const dispatch = useDispatch();
   const sessionUser = useSelector((state) => state.session.user);
   const [isLoaded, setIsLoaded] = useState(false)
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");


   if (sessionUser) return <Redirect to="/portfolio" />;

   const demoSubmit = () => {
      dispatch(demoLogin())
   }
   return (
      <div>
         <Ticker />
         <div className="welcome" >
            <h1 className="fade-in">AppExchange</h1>
            
           
            <button className="demo-login-button" onClick={demoSubmit}>
               <img className="logo" src={"https://res.cloudinary.com/dip4w3xmy/image/upload/v1684002074/robinhood-icon-logo-ACF2820914-seeklogo.com_nvgpa6.png"} alt="Demo Logo" />
               <span>Demo Login</span>
            </button>
         </div>
         <About />
      </div>
   )
}

export default LandingPage;





      
