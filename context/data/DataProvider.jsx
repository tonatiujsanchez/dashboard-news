import { useReducer, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify'

import { DataContext } from './DataContext'
import { dataReducer } from './dataReducer'

import { types } from '../../types'
import { useAuth } from '../../hooks/useAuth'

const DATA_INITIAL_STATE = {
    entries: [],
    images: {
        articles: {
            pageCount: 1,
            length: 0,
            data: [],
        },
        authors: {
            pageCount: 1,
            length: 0,
            data: [],
        },
        users: {
            pageCount: 1,
            length: 0,
            data: [],
        }
    },
    users: [],
    categories: [],
    authors: [],
}

const section_active_storage = 'images_section_active_UD3EZGXun367'

export const DataProvider = ({ children }) => {

    const { user } = useAuth()

    const [state, dispatch] = useReducer(dataReducer, DATA_INITIAL_STATE)

    const notifySuccess = (msg) => toast.success(msg, {
        theme: "colored",
        autoClose: 1000
    })
    const notifyError = (msg) => toast.error(msg, {
        theme: "colored",
        autoClose: 3000
    })

    const updateSectionAndPageInStorage = (section, page) => {
        localStorage.setItem(section_active_storage, section)
        localStorage.setItem(`section_page_storage_${section}_UD3EZGXun367`, page)
    }


    // ===== ===== ===== ===== Images ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    const refreshImages = async( section,  page = 0 ) => {        

        try {

            const skipStart = page * 5

            const { data } = await axios.get(`/api/shared/images`, { params: { section, skipStart } })

            if(data.images.length === 0){
                return
            }

            dispatch({ type: types.dataRefreshImages, payload: {
                section,
                data: {
                    data: data.images,
                    length: data.length,
                    pageCount: data.totalOfPages,
                }
            } })

            updateSectionAndPageInStorage(section, page)

        } catch (error) {
            if(axios.isAxiosError(error)){
                const { message } = error.response.data
                notifyError(message)
                return {
                    hasError: true,
                    urlImage: null
                }
            }

            notifyError('Hubo un error inesperado')
            return {
                hasError: true,
                urlImage: null
            }
        }

    }

    const addNewImage = async(formData) => {

        formData.append('user', user._id)

        try {
            const { data } = await axios.post('/api/shared/images/upload', formData)
            dispatch({ type: types.dataAddNewImage, payload: data })
            return { 
                hasError: false,
                urlImage: data.url
            }

        } catch (error) {
            if(axios.isAxiosError(error)){
                const { message } = error.response.data
                notifyError(message)
                return {
                    hasError: true,
                    urlImage: null
                }
            }

            notifyError('Hubo un error inesperado')
            return {
                hasError: true,
                urlImage: null
            }
        }
    }

    const deleteImage = async ( image ) => {

        try {

            const { data } = await axios.delete('/api/shared/images',{
                data: {
                    imageId:image._id
                }
              })
            dispatch({ type: types.dataDeleteImage, payload: image })
            notifySuccess(data.message)
            return { hasError: false }
            
        } catch (error) {
            if(axios.isAxiosError(error)){
                const { message } = error.response.data
                notifyError(message)
                return { hasError: true }
            }

            notifyError('Hubo un error inesperado')
            console.log(error);
            return { hasError: true }
        }
    }

    // ===== ===== ===== ===== Users ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    const refreshUsers = async() => {
        try {

            const { data } = await axios.get('/api/admin/users')
            dispatch({ type: types.dataRefreshUsers, payload: data })

        } catch (error) {

            if(axios.isAxiosError(error)){
                const { message } = error.response.data
                notifyError(message)
                return { hasError: true }
            }

            notifyError('Hubo un error inesperado')
            return { hasError: true }

        }
    }

    const addNewUser = async(role, name, email, password, photo = null ) => {
        try {
            const { data } = await axios.post(`/api/admin/users`, {
                role,
                name, 
                email, 
                password, 
                photo
            })

            dispatch({ type: types.dataAddNewUser, payload: data })

            notifySuccess('Usuario creado')
            return { hasError: false }
            
        } catch (error) {

            if(axios.isAxiosError(error)){
                const { message } = error.response.data
                notifyError(message)
                return { hasError: true }
            }

            notifyError('Hubo un error inesperado')
            return { hasError: true }
        }
    }

    const updateUser = async (newUser) => {
        try {
            
            const { data } = await axios.put(`/api/admin/users/${newUser._id}`,{ ...newUser })
            dispatch({ type: types.dataUpdateUser, payload: data })

            notifySuccess('Usuario actuazalizado')
            return { hasError: false }

        } catch (error) {

            if(axios.isAxiosError(error)){
                const { message } = error.response.data
                notifyError(message)
                return { hasError: true }
            }

            notifyError('Hubo un error inesperado')
            return { hasError: true }
        }
    }

    const deleteUser = async( idUser ) => {
        try {
            
            await axios.delete(`/api/admin/users/${idUser}`)
            dispatch({ type: types.dataDeleteUser, payload: idUser })

            notifySuccess('Usuario eliminado')
            return { hasError: false }

        } catch (error) {

            if(axios.isAxiosError(error)){
                const { message } = error.response.data
                notifyError(message)
                return { hasError: true }
            }

            notifyError('Hubo un error inesperado')
            return { hasError: true }
        }
    }

    const updatePassword = async( idUser, password ) => {
        try {

            const { data } = await axios.put(`/api/admin/users/change-password/${idUser}`,{ password })
            notifySuccess(data.message)
            return { hasError: false }
            
        } catch (error) {

            if(axios.isAxiosError(error)){
                const { message } = error.response.data
                notifyError(message)
                return { hasError: true }
            }

            notifyError('Hubo un error inesperado')
            return { hasError: true }
        }
    }



    // ===== ===== ===== ===== Categories ===== ===== ===== =====
    // ===== ===== ===== ===== ========== ===== ===== ===== =====
    const refreshCategories = async() => {
        try {
            const { data } = await axios.get(`/api/public/categories`)
            dispatch({ type: types.dataRefreshCategories, payload: data.categories })

        } catch (error) {
            console.log(error);
            // TODO: Mostrar el error en pantalla            
        }
    }

    const addNewCategory = async(category) => {
        try {
            
            const { data } = await axios.post('/api/admin/categories', {
                title: category.title,
                tag: category.tag,
                position: category.position,
                type: category.type,
                category: category.category
            })
    
            dispatch({ type: types.dataAddNewCategory, payload: data })

        } catch (error) {
            console.log(error)
            // TODO: Mostrar el error en pantalla
        }
    }


    const updateCategory = async(category) => {
        try {
            const { data } = await axios.put(`/api/admin/categories/${category._id}`, {
                title: category.title,
                tag: category.tag,
                position: category.position,
                type: category.type,
                category: category.category,
            })
            
            dispatch({ type: types.dataUpdateCategory, payload: data })
        
        } catch (error) {

            console.log(error)
            // TODO: Mostrar el error en pantalla
        }

    }


    const deleteCategory = async( idCategory ) => {
        try {
            await axios.delete(`/api/admin/categories/${idCategory}`)
            dispatch({ type: types.dataDeleteCategory, payload: idCategory })
        } catch (error) {
            console.log(error)
            // TODO: Mostrar el error en pantalla
        }
    }



    // ===== ===== ===== ===== Authors ===== ===== ===== =====
    // ===== ===== ===== ===== ======= ===== ===== ===== =====
    const refreshAuthors = async() => {
        try {
            const { data } = await axios.get(`/api/public/authors`)
            dispatch({ type: types.dataRefreshAuthors, payload: data.authors })
        } catch (error) {
            console.log(error)
            // TODO: Mostrar el error en pantalla
        }
    }

    const addNewAuthor = async( author ) => {
        try {
            const { data } = await axios.post('/api/admin/authors',{
                ...author
            })
            dispatch({ type: types.dataAddNewAuthor, payload: data })

        } catch (error) {
            console.log(error)
        }
    }

    const updateAuthor = async( author ) => {
        try {
            const { data } = await axios.put(`/api/admin/authors/${author.slug}`, {
                ...author
            })
            dispatch({ type: types.dataUpdateAuthor, payload: data })

        } catch (error) {
            console.log(error)
        }


    }

    const deleteAuthor = async( slugAuthor ) => {
        try {
            await axios.delete(`/api/admin/authors/${slugAuthor}`)
            dispatch({ type: types.dataDeleteAuthor, payload: slugAuthor })
        } catch (error) {

            console.log(error)
        }

    }



    return (
        <DataContext.Provider value={{
            ...state,
            
            // Image
            refreshImages,
            addNewImage,
            deleteImage,

            // Users
            refreshUsers,
            addNewUser,
            updateUser,
            deleteUser,
            updatePassword,

            // Categories
            refreshCategories,
            addNewCategory,
            updateCategory,
            deleteCategory,
            
            // Authors
            refreshAuthors,
            addNewAuthor,
            updateAuthor,
            deleteAuthor
        }} >
            {children}
        </DataContext.Provider>
    )
}
