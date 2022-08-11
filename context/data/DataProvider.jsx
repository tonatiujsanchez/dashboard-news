import { useReducer } from 'react'
import axios from 'axios'

import { DataContext } from './DataContext'
import { dataReducer } from './dataReducer'

import { types } from '../../types'

const DATA_INITIAL_STATE = {
    entries: [],
    multimedia: [],
    categories: [],
    autores: [],
}

export const DataProvider = ({ children }) => {

    const [state, dispatch] = useReducer(dataReducer, DATA_INITIAL_STATE)


    // Categories
    const refreshCategories = async() => {

        const { data: categories } = await axios.get(`/api/categories`)
        dispatch({ type: types.dataRefreshCategories, payload: categories })
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



    return (
        <DataContext.Provider value={{
            ...state,
            refreshCategories,
            addNewCategory,
            updateCategory,
            deleteCategory
        }} >
            {children}
        </DataContext.Provider>
    )
}
