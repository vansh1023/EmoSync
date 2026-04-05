import React from "react";
import "../style/login.scss";
import FormGroup from "../components/FormGroup.jsx";
import { Link } from "react-router";

const Login = () => {
  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form>
          <FormGroup label="Email" placeholder="Enter your email" />
          <FormGroup label="Password" placeholder="Enter your Password" />
          <button className="button" type="submit"> Login </button>
        </form>
        <p> Don't have an account! <Link to='/register' > Register here </Link> </p>
      </div>
    </main>
  );
};

export default Login;
