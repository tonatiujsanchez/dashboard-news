import { types } from "../../types"



export const dataReducer = (state, action) => {
    
    
    switch (action.type) {
        case types.dataAddNewCategory:
            return {
                ...state,
                categories: [ ...state.categories, action.payload ]
            } 
        default:
            return state
    }
}