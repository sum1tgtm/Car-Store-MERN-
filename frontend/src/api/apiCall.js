import axios from 'axios'

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
        const res = await axios.post('http://localhost:4000/auth/login', userCredential)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err })
    }
}

export const logoutCall = async (dispatch) => {
    dispatch({ type: "LOGOUT" })
};

export const refreshCall = async (id, dispatch) => {
    try {
        const res = await axios.get(`http://localhost:4000/user/${id}`)
        dispatch({ type: "REFRESH", payload: res.data })
    } catch (error) {
        console.log("REFRESH ERROR")
    }
}