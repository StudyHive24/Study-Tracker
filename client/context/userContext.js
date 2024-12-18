'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {useContext, useEffect, useState} from "react";
import toast from 'react-hot-toast'

const UserContext = React.createContext()

// set axios to include credentials with every request
axios.defaults.withCredentials = true

export const UserContextProvider = ({children}) => {
    const serverUrl = 'http://localhost:8000'

    const router = useRouter()

    const [user, setUser] = useState({})
    const [userState, setUserState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    
    // register user
    const registerUser = async (e) => {
        e.preventDefault();
        
        if (
            !userState.email.includes('@') ||
            !userState.password ||
            userState.password.length < 8
        ) {
            toast.error('Please entrer a valid email and password (minimum 8 characters')
            return
        }

        try {
            const res = await axios.post(`${serverUrl}/api/v1/register`, userState,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (res.data.error == 'email is taken already') {
                toast.error(res.data.error)
                return
            } else {
                toast.success('user registered succcessfully')
                console.log('user registered succcessfully', res.data)
                            // to redirect to the login page
                router.push('/login')

            }
        

            // to clear the form
            setUserState({
                name: '',
                email: '',
                password: ''
            })



        } catch (error) {
            console.log('Error registering user', error)
            toast.error(error.message)
        }
    }

    // login user
    const loginUser = async (e) => {
        e.preventDefault()

        try {
             await axios.post(`${serverUrl}/api/v1/login`, 
            {
                email: userState.email,
                password: userState.password
            },
            {
                withCredentials: true,   // this wil send cookies to the server
            })

            toast.success('User logged in successfully')

            // to clear the form
            setUserState({
                email: '',
                password: ''
            })

            // to refresh the user details
            await getUser()

        } catch (error) {
            console.log('Error logging in user', error)
            toast.error(error.message)
        }
    }

    // logout user
    const logoutUser = async (req, res) => {
        try {
            const res = axios.get(`${serverUrl}/api/v1/logout`, {
                withCredentials: true
            })

            toast.success('User logged out successfully')

            setUser({})

            // to riderect to the login page
            router.push('/login')

        } catch (error) {
            console.log('Error on loggin out the user')
            toast.error(error.message)
        }
    }

    // get user details 
    const getUser = async () => {
        setLoading(true)

        try {
            const res = await axios.get(`${serverUrl}/api/v1/user`, {
                withCredentials: true
            })
            
            setUser((prevState) => {
                return {
                    ...prevState,
                    ...res.data
                }
            })
           
            setLoading(false)
        } catch (error) {
            console.log('Error getting user details', error)
            setLoading(false)
            toast.error(error.message)
        }
    }

    // to get user logged in status
    const userLoginStatus = async (req, res) => {
        let loggedIn = false

        try {
            const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
                withCredentials: true
            })

            // converting the string to boolean
            loggedIn = !!res.data
            setLoading(false)

            if (!loggedIn) {
                router.push('/login')
            }

        } catch (error) {
            console.log('Error in getting the user login status', error)
        }
    }

    // forgot password email
    const forgotPassowrdEmail = async (email) => {
        setLoading(true)

        try {
            const res = await axios.post(
                `${serverUrl}/api/v1/forgot-password`,
                {
                    email
                },
                {
                    withCredentials: true   // this is for sending cookies to the server
                }
            )

            toast.success('Password reset email sent successfully')
            setLoading(false)
        } catch (error) {
            console.log('Error while sending the password reset email', error)
            toast.error(error.message)
            setLoading(false)
        }
    }


    // dynamic form handler
    const handleUserInput = (name) => (e) => {
        const value = e.target.value

        setUserState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <UserContext.Provider
            value={{
                registerUser,
                userState,
                user,
                handleUserInput,
                setUser,
                loginUser,
                userLoginStatus,
                forgotPassowrdEmail,
                logoutUser
            }}
        > {children} 
        </UserContext.Provider>
    )
}


export const useUserContext = () => {
    return useContext(UserContext)
}