'use client'
import React from 'react'
import { useUserContext } from '@/context/userContext'

function RegisterForm() {

    const {registerUser, handleUserInput, userState} = useUserContext()
    const {name, email, password} = userState


  return (
    <div>
        <form>
            <div className='flex flex-col'>
                <label>Name</label>
                <input type='text' placeholder='Enter name' value={name} onChange={(e) => handleUserInput('name')(e)}></input>
                <label>Email</label>
                <input type='email' placeholder='Enter email' value={email} onChange={(e) => handleUserInput('email')(e)}></input>
                <label>Password</label>
                <input type='password' placeholder='Enter a password' value={password} onChange={(e) => handleUserInput('password')(e)}></input>
                <button 
                    disabled={!name || !email || !password}
                    type='submit' onClick={registerUser}>Register</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterForm