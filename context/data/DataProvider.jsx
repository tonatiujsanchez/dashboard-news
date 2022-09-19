import { useReducer } from 'react'
import axios from 'axios'

import { DataContext } from './DataContext'
import { dataReducer } from './dataReducer'

import { types } from '../../types'

const DATA_INITIAL_STATE = {
    entries: [],
    multimedia: [],
    users: [],
    categories: [],
    authors: [],
}

export const DataProvider = ({ children }) => {

    const [state, dispatch] = useReducer(dataReducer, DATA_INITIAL_STATE)

    // ===== ===== ===== ===== Users ===== ===== ===== =====
    // ===== ===== ===== ===== ========== ===== ===== ===== =====
    const refreshUsers = async() => {
        try {
            const { data } = await axios.get('/api/admin/users')
            dispatch({ type: types.dataRefreshUsers, payload: data })
        } catch (error) {
            console.log(error);
            // TODO: Mostrar el error en pantalla   
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
            
            // Users
            refreshUsers,

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
