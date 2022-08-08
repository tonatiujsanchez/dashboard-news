import { types } from "../../types"



export const uiReducer = (state, action) => {
    
    switch (action.type) {
        case types.uiToggleSideMenu:
            return {
                ...state,
                showSideMenu: !state.showSideMenu
            }
        default:
            return state
    }
}