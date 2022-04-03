import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const ForgotPassword = () => {
    const {resetPassword} = useAuth();
    const [msg, setMsg] = useState();
    const [error, setError] = useState();

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await resetPassword(e.target.elements.uname.value)
                setMsg("Reset link sent to your email")
        }
        catch (e) {
            console.log(e)
            setError("Failed to reset")
        }
    }
    return (
        <div className='Forgot-Password'>
            {msg ? <h3 style={{ color: "green" }}>{msg}</h3> : <h3 style={{ color: "red" }}>{error}</h3>}
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit} >
                <div className="input-container">
                    <label>Email password </label>
                    <input type="text" name="uname" required />
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
            <div className='form-switch'>
                <Link className='switch-link' to="/login">Login</Link>
            </div>
        </div>
    )
}
export default ForgotPassword