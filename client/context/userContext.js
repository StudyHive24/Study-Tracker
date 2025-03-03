'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {useContext, useEffect, useState} from "react";
import toast from 'react-hot-toast'

const UserContext = React.createContext()


// set axios to include credentials with every request
axios.defaults.withCredentials = true

export const UserContextProvider = ({children}) => {
    const serverUrl = 'https://study-hive-server-f6.vercel.app'

    const router = useRouter()

    const [user, setUser] = useState({})
    const [userState, setUserState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)

    // Function to persist user session
    const persistUserSession = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${serverUrl}/api/v1/user`, {
                withCredentials: true
            });
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching user session:', error);
            setUser({});
            setLoading(false);
            router.push('/login'); // Redirect to login if the session is invalid
        }
    };

    // Call persistUserSession on initial load
    useEffect(() => {
        persistUserSession();
    }, []); // Empty dependency array ensures this runs only on mount

    
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
            } else if (res.data.error == 'username is taken already') {
                toast.error(res.data.error)

            } else if (res.data.error) {
                toast.error(res.data.error)
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
            toast.error('Error registering user')
        }
    }

// login user
const loginUser = async (e) => {
  e.preventDefault(); // Prevent the default form submission

  try {
      // Make the POST request to login
      await axios.post(`${serverUrl}/api/v1/login`, 
      {
          name: userState.name,
          email: userState.email,
          password: userState.password
      },
      {
          withCredentials: true,  // this will send cookies to the server
      });

      // Clear the form after successful login
      setUserState({
          name: '',
          password: ''
      });



      // Refresh the user details
      await getUser();

  } catch (error) {
      console.log('Error logging in user', error);
      toast.error('Error logging in user');
  }
};



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
            toast.error('Error on loggin out the user')
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
            toast.error('Error getting user details')
        }
    }

      // update user details
  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
        withCredentials: true, // send cookies to the server
      });

      // update the user state
      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      toast.success("User updated successfully");

      setLoading(false);
    } catch (error) {
      console.log("Error updating user details", error);
      setLoading(false);
      toast.error("Error updating user details");
    }
  };

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
    const forgotPasswordEmail = async (email) => {
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
            toast.error('Error while sending the password reset email')
            setLoading(false)
        }
    }

        // email verification
        const emailVerification = async () => {
            setLoading(true);
            
            try {
              const res = await axios.post(
                `${serverUrl}/api/v1/verify-email`,
                {},
                {
                  withCredentials: true, // send cookies to the server
                }
              );
        
              toast.success("Email verification sent successfully");
              setLoading(false);
            } catch (error) {
              console.log("Error sending email verification", error);
              setLoading(false);
              toast.error("Error sending email verification");
            }
          };

      // reset password
  const resetPassword = async (token, password) => {

    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/reset-password/${token}`,
        {
          password,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("Password reset successfully");
      // redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error resetting password", error);
      toast.error("Error resetting password");
    }
  };

    // change password
    const changePassword = async (currentPassword, newPassword) => {
        setLoading(true);
    
        try {
          const res = await axios.patch(
            `${serverUrl}/api/v1/change-password`,
            { currentPassword, newPassword },
            {
              withCredentials: true, // send cookies to the server
            }
          );
    
          if (res.data.error) {
            toast.error(res.data.error)
            return
          }

          toast.success("Password changed successfully");
          setLoading(false);
        } catch (error) {
          console.log("Error changing password", error);
          toast.error("Error changing password");
          setLoading(false);
        }
      };




  // verify user
  const verifyUser = async (token) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-user/${token}`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("User verified successfully");

      // refresh the user details
      getUser();
      console.log(getUser())

      setLoading(false);
      // redirect to home page
      router.push("/");
    } catch (error) {
      console.log("Error verifying user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

// to send the user verification code
const sendCode = async (email) => {
    try {
        const response = await axios.post(`${serverUrl}/api/v1/send-verification-code`, { email });
        // console.log(response.data.message);
        toast.success('Verification Code sent successfully!')
        router.push('/verify-user')
    } catch (error) {
        console.error(error.message || "Something went wrong");
        toast.error("Something went wrong")
    }
};

// to verify the user
const verifyCode = async (email, verificationCode) => {
  try {
      const response = await axios.post(`${serverUrl}/api/v1/verify-code`, { email, verificationCode });
      // console.log(response.data.message);\
      toast.success('User is verified!')
      router.push('/')
  } catch (error) {
      toast.error('Something went wrong')
  }
};


// to request the password rest code
const requestResetCode = async (email) => {
  try {
      const response = await axios.post(`${serverUrl}/api/v1/request-password-reset`, { email });
      console.log(response.data.message);

      if (response.data.error) {
        toast.error(response.data.error)
        return
      }

      toast.success('Password Reset Code sent successfully!')
      router.push('/verify-password-reset')
  } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
      toast.error("Something went wrong")
  }
};

// to verify the reset code
const verifyResetCode = async (email, resetCode) => {
  try {
      const response = await axios.post(`${serverUrl}/api/v1/verify-password-reset-code`, {
          email,
          resetCode,
      });
      console.log(response.data.message);

      if (response.data.error) {
        toast.error(response.data.error)
        return
      } 

      toast.success('Password Reset Request is verified!')
      router.push('/reset-password')
  } catch (error) {
      console.error("Something went wrong");
  }
};

// to reset the password
const passwordReset = async (email, newPassword) => {
  try {
      const response = await axios.post(`${serverUrl}/api/v1/reset-password`, {
          email,
          newPassword,
      });
      console.log(response.data.message);

      if (response.data.error) {
        toast.error(response.data.error)
        return
      }

      toast.success('Password is changed successfully!')
      router.push('/login')
  } catch (error) {
      
      toast.success("Something went wrong")
  }
};
    


    // dynamic form handler
    const handlerUserInput = (name) => (e) => {
        const value = e.target.value

        setUserState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const removeUserInput = (name, defaulValue) => () => {
        setUserState((prevState) => {
            const newState = {...prevState}
            delete newState[name]
            return {
                ...newState,
                [name]: defaulValue
            }
        })
    }

    useEffect(() => {
        const loginStatusGetUser = async () => {
            const isLoggedIn =  await userLoginStatus()

            if (isLoggedIn) {
                await getUser()
            }
        }

        loginStatusGetUser
    }, [])

    return (
        <UserContext.Provider
            value={{
                registerUser,
                userState,
                user,
                handlerUserInput,
                setUser,
                loginUser,
                userLoginStatus,
                forgotPasswordEmail,
                logoutUser,
                resetPassword,
                changePassword,
                updateUser,
                removeUserInput,
                setUserState,
                verifyUser,
                emailVerification,
                requestResetCode,
                verifyResetCode,
                passwordReset,
                sendCode,
                verifyCode
            }}
        > {children} 
        </UserContext.Provider>
    )
}


export const useUserContext = () => {
    return useContext(UserContext)
}