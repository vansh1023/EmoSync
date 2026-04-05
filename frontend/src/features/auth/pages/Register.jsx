import React from 'react'
import FormGroup from '../components/FormGroup.jsx'
import '../style/register.scss'
import { Link } from "react-router";

const Register = () => {
  return (
    <main className="register-page">
        <div className="form-container">
            <h1> Register </h1>
            <form>
                <FormGroup label="Username" placeholder="Enter your username" />
                <FormGroup label="Email" placeholder="Enter your email" />
                <FormGroup label="Password" placeholder="Enter your password" />
                <button className='button' type='submit'> Register </button>
            </form>
            <p> Already have an account! <Link to='/login' > Login here </Link> </p>
        </div>
    </main>
  )
}

export default Register