import React,{useState, useContext} from "react";
import {LoginManagerData} from "../data/login_manager_data";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../App";

function LoginManager() {
    const {state, dispatch} = useContext(UserContext);
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const navigate = useNavigate();
    const errors = {
        uname: "Invalid Username",
        pass: "Invalid Password"
      };
      const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
    
        var { uname, pass } = document.forms[0];
    
        // Find user login info
        const userData = LoginManagerData.find((user) => user.username === uname.value);
    
        // Compare user info
        if (userData) {
          if (userData.password !== pass.value) {
            // Invalid password
            setErrorMessages({ name: "pass", message: errors.pass });
          } else {
            dispatch({type:"MEDICAL", payload:true})
            setIsSubmitted(true);
            navigate("/meddashboard");
          }
        } else {
          // Username not found
          setErrorMessages({ name: "uname", message: errors.uname });
        }
      };
    
      // Generate JSX code for error message
      const renderErrorMessage = (name) =>
        name === errorMessages.name && (
          <div className="error">{errorMessages.message}</div>
        );
    
      // JSX code for login form
      const renderForm = (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Username </label>
              <input type="text" name="uname" required />
              {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" required />
              {renderErrorMessage("pass")}
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>
      );
    
      return (
        <div className="app">
          <div className="login-form">
            <div className="title">Login For Event Manager</div>
            {renderForm}
          </div>
        </div>
      );
}

export default LoginManager;