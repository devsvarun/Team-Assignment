import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'


const Signup = () => {
  const { signup } = useAuth();
  const [error, setError] = useState();
  let navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await signup(e.target.elements.uname.value,
        e.target.elements.pass.value)
      navigate("/table")
    }
    catch (e) {
      console.log(e)
      setError("Failed to create user")
    }
  }
  return (
    <div className='Signup'>
      <h3 style={{ color: "red" }}>{error ? error : ""}</h3>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      <div className='form-switch'>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Signup