import { createContext, useReducer, useEffect } from 'react'
import AuthReducer from './AuthReducer'
import axios from 'axios'

const INITIAL_STATE = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    // console.log("State", state)

    const setUser = async(id)=>{
        const user = await axios.get(`http://localhost:4000/user/${id}`)
        
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>
    )
}