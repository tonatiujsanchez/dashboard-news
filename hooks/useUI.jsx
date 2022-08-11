import { useContext } from 'react'
import { UIContext } from '../context/ui/UIContext'


export const useUI = () => {
    return useContext( UIContext )
}
