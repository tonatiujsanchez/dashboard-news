import { useContext } from 'react'
import { DataContext } from '../context/data/DataContext'



export const useData = () => {
    return useContext( DataContext )
}
