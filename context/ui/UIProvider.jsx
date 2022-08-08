import { useReducer } from 'react'
import { types } from '../../types'
import { UIContext } from './UIContext'
import { uiReducer } from './uiReducer'


const UI_INITIAL_STATE = {
    showSideMenu: false
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
