import { useEffect, useReducer } from "react"

import { useRouter } from "next/router"

import { authReducer } from "./authReducer"
import { AuthContext } from "./AuthContext"
import { newsApi } from "../../api"

import axios from 'axios'
import Cookies from 'js-cookie'

import { types } from "../../types"


const AUTH_INITIAL_STATE = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
    const router = useRouter()


    useEffect(()=>{
        checkToken()
    },[])


    const checkToken = async () => {

        if( !Cookies.get('news_session_UD3EZGXun367') ){ return }

        try {

            const { data } = await newsApi.get('/public/auth/validate-token')
            const { token, user } = data
            
            Cookies.set('news_session_UD3EZGXun367', token)
            dispatch({ type: types.authLogin, payload: user })
            
        } catch (error) {

            Cookies.remove('news_session_UD3EZGXun367')
        }


    }

    const loginUser = async (email, password) => {
        try {

            const { data } = await newsApi.post('/public/auth/login', { email, password })
            const { token, user } = data

            Cookies.set('news_session_UD3EZGXun367', token)
            dispatch({ type: types.authLogin, payload: user })

            return true

        } catch (error) {
            return false
        }
    }

    const logout = () => {
        Cookies.remove('news_session_UD3EZGXun367')
        router.reload()
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            // Methods
            loginUser,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}