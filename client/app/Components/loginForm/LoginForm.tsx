import { useUserContext } from '@/context/userContext'
import React, { useState } from 'react'

function LoginForm() {

    const {loginUser, userState, handleUserInput} = useUserContext()
    const { email, password } = userState

  return (
    <div>
        <form onSubmit={loginUser} >
            <div className='flex flex-col'>
                <label>Email</label>
                <input type='email' placeholder='Enter email' value={email} onChange={(e) => handleUserInput('email')(e)}></input>
                <label>Password</label>
                <input type='password' placeholder='Enter a password' value={password} onChange={(e) => handleUserInput('password')(e)}></input>
                <button disabled={!email || !password} type='submit' onClick={loginUser}>Login</button>
            </div>
        </form>
    </div>
  )
}

export default LoginForm