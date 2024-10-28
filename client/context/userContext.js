// import React, { useEffect, useState, useContext } from 'react'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { useRouter } from "next/navigation" 

// const UserContext = React.createContext()

// axios.defaults.withCredentials = true

// export const UserContextProvider = ({ children }) => {

//     const serverUrl = "http://localhost:8000"

//     const router = useRouter()

//     const [user, setUser] = useState({})
//     const [allUsers, setAllUsers ] = useState([])
//     const [userState, setUserState] = useState({
//         name: "",
//         email: "",
//         password: ""
//     })

//     const [loading, setLoading] = useState(false)

//     // user register
//     const registerUser = async (e) => {
//         e.preventDefault();

//         let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

//         if (
//             !userState.email.includes("@") 
//         ) {
//             toast.error("Please enter a valid Email")
//             return
//         }
//         if (
//             !userState.password
//         ) {
//             toast.error("Enter a password to continue")
//             return
//         }
//         if (
//             userState.password.length < 8
//         ) {
//             toast.error("Password must contain minimum 8 characters")
//             return
//         }
//         if (
//             !regularExpression.test(userState.password)
//         ) {
//             toast.error("password should contain atleast one number and one special character")
//             return
//         }

//         try {
//             const res = await axios.post(`${serverUrl}/api/v1/registrer`, useState)
//             console.log("User registered Successfully", res.data)
//             toast.success("User registered successfully")

//             // clean the form
//             setUserState({
//                 name:"",
//                 email: "",
//                 pass: "",
//                 confirmpass: ""
//             })

//             // redirect to login
//             router.push("/userauth")

//         } catch (error) {
//             console.log("Error registering user", error)
//             toast.error(error.response.data.message)
//         }

//     }

//       // get user details
//   const getUser = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${serverUrl}/api/v1/user`, {
//         withCredentials: true, // send cookies to the server
//       });

//       setUser((prevState) => {
//         return {
//           ...prevState,
//           ...res.data,
//         };
//       });

//       setLoading(false);
//     } catch (error) {
//       console.log("Error getting user details", error);
//       setLoading(false);
//       toast.error(error.response.data.message);
//     }
//   };


//     // dynamic form handler
//     const handlerUserInput = (name) => (e) => {
//         const value = e.target.value

//         setUserState((prevState) => ({
//             ...prevState,
//             [name]:value,
//         }))
//     }

//     useEffect(() => {
//         const loginStatusGetUser = async () => {
//           const isLoggedIn = await userLoginStatus();
    
//           if (isLoggedIn) {
//             await getUser();
//           }
//         };
    
//         loginStatusGetUser();
//       }, []);

//   return (
//     <UserContext.Provider 
//     value={{
//         registerUser,
//         userState,
//         user,
//     }}
    
//     >
//         {children}
//     </UserContext.Provider>
//   )
// }

// export const useUserContext = () => {
//     return useContext(UserContext)
// }
