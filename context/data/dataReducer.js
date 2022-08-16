import { types } from "../../types"



export const dataReducer = (state, action) => {


    switch (action.type) {

        // Categories
        case types.dataRefreshCategories:
            return {
                ...state,
                categories: [...action.payload]
            }

        case types.dataAddNewCategory:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }

        case types.dataUpdateCategory:
            return {
                ...state,
                categories: state.categories.map(category => {

                    if (category._id === action.payload._id) {
                        return {
                            ...category,
                            ...action.payload
                        }
                    }
                    return category

                })
            }

        case types.dataDeleteCategory:
            return {
                ...state,
                categories: state.categories.filter(category => category._id !== action.payload)
            }

        // Authors
        case types.dataRefreshAuthors:
            return {
                ...state,
                authors: [...action.payload]
            }
        case types.dataAddNewAuthor:
            return {
                ...state,
                authors: [...state.authors, action.payload]
            }

        case types.dataUpdateAuthor:
            return {
                ...state,
                authors: state.authors.map( author => (author._id === action.payload._id ? {...author, ...action.payload} : author) )
            }
        case types.dataDeleteAuthor:
            return {
                ...state,
                authors: state.authors.filter( author => author._id !== action.payload )
            }
        default:
            return state
    }
}