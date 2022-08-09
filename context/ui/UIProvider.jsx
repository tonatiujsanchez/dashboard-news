import { useReducer } from 'react'
import { UIContext } from './UIContext'
import { uiReducer } from './uiReducer'

import { types } from '../../types'

const UI_INITIAL_STATE = {
    showSideMenu: true
}


export const UIProvider = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)


    const toggleSideMenu = () => {
        dispatch({ type: types.uiToggleSideMenu })
    }

    return (
        <UIContext.Provider value={{
            ...state,
            toggleSideMenu
        }}>
            { children }
        </UIContext.Provider>
    )
}
