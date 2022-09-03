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

        if( !Cookies.get('news_token') ){ return }

        try {

            const { data } = await newsApi.get('/public/auth/validate-token')
            const { token, user } = data
            
            Cookies.set('news_token', token)
            dispatch({ type: types.authLogin, payload: user })
            
        } catch (error) {

            Cookies.remove('news_token')
        }


    }

    const loginUser = async (email, password) => {
        try {

            const { data } = await newsApi.post('/public/auth/login', { email, password })
            const { token, user } = data

            Cookies.set('news_token', token)
            dispatch({ type: types.authLogin, payload: user })

            return true

        } catch (error) {
            return false
        }
    }

    const registerUser = async (name, email, password, role, photo = undefined) => {

        try {

            const { data } = await newsApi.post('/admin/auth/register', { name, email, password, role, photo })
            const { token, user } = data

            Cookies.set('news_token', token)
            dispatch({ type: types.authLogin, payload: user })

            return {
                hasError: false,
                message : undefined
            }

        } catch (error) {

            if (axios.isAxiosError(error)) {
                const { message } = error.response.data
                return {
                    hasError: true,
                    message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario, intente de nuevo'
            }

        }

    }

    const logout = () => {
        Cookies.remove('news_token')
        router.reload()
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            // Methods
            loginUser,
            registerUser,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}