import { useReducer } from 'react'
import axios from 'axios'

import { DataContext } from './DataContext'
import { dataReducer } from './dataReducer'

import { types } from '../../types'

const DATA_INITIAL_STATE = {
    entries: [],
    multimedia: [],
    categories: [],
    authors: [],
}

export const DataProvider = ({ children }) => {

    const [state, dispatch] = useReducer(dataReducer, DATA_INITIAL_STATE)


    // Categories
    const refreshCategories = async() => {
        try {
            const { data: categories } = await axios.get(`/api/public/categories`)
            dispatch({ type: types.dataRefreshCategories, payload: categories })

        } catch (error) {
            console.log(error);            
        }
    }

    const addNewCategory = async(category) => {
        category._id = Date.now()
        dispatch({ type: types.dataAddNewCategory, payload: category })
    }

    const updateCategory = async(category) => {
        dispatch({ type: types.dataUpdateCategory, payload: category })
    }

    const deleteCategory = async( idCategory ) => {
        dispatch({ type: types.dataDeleteCategory, payload: idCategory })
    }

    // Authors
    const refreshAuthors = async() => {

        const { data: authors } = await axios.get(`/api/public/authors`)
        dispatch({ type: types.dataRefreshAuthors, payload: authors })
    }

    const addNewAuthor = async( author ) => {
        author._id = Date.now()
        dispatch({ type: types.dataAddNewAuthor, payload: author })
    }

    const updateAuthor = async( author ) => {
        dispatch({ type: types.dataUpdateAuthor, payload: author })
    }

    const deleteAuthor = async( idAuthor ) => {
        console.log(idAuthor);
        dispatch({ type: types.dataDeleteAuthor, payload: idAuthor })
    }


    return (
        <DataContext.Provider value={{
            ...state,

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
