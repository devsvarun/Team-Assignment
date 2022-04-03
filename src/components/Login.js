import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const Login = () => {
    const {login} = useAuth();
    const [error, setError] = useState();
    let navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await login(e.target.elements.uname.value,
                e.target.elements.pass.value)
                navigate("/table")
        }
        catch (e) {
            console.log(e)
            setError("Email or Password incorrect")
        }
    }
    return (
        <div className='Login'>
            <h3 style={{ color: "red" }}>{error ? error : ""}</h3>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit} >
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
                Need an account? <Link className='switch-link' to="/signup">Signup</Link>
            </div>
            <div className='form-switch'>
                Forgot Password? <Link className='switch-link' to="/forgot-password">Reset</Link>
            </div>
        </div>
    )
}
export default Login