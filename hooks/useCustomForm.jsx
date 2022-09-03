import { useState } from "react"


export const useCustomForm = (initialState = {}) => {

    const [values, setvalues] = useState(initialState)


    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setvalues({
            ...values,
            [name]: value
        })
    }

    const reset = ( newValues ) => {
        if(newValues){
            setvalues(newValues)
        }else{
            setvalues(initialState)
        }
    }


    return [values, handleInputChange, reset]

}