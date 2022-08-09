import { useReducer } from 'react'
import { DataContext } from './DataContext'
import { dataReducer } from './dataReducer'

import { types } from '../../types'

const DATA_INITIAL_STATE = {
    entries: [],
    multimedia: [],
    categories: [],
    subcategories: [],
    autores: [],
}

export const DataProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(dataReducer, DATA_INITIAL_STATE)
    
    const addNewCategory = ( category ) => {
        dispatch({ type: types.dataAddNewCategory, payload: category })
    }
    
    return (
        <DataContext.Provider value={{
            ...state
        }} >
            { children }
        </DataContext.Provider>
    )
}
