import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import axios from 'axios'

import { useUI } from '../../../../hooks/useUI'
import { useForm } from '../../../../hooks/useForm'

import { AdminLayout } from "../../../../components/layouts/AdminLayout"
import { TitlePage } from "../../../../components/admin/ui"
import { AuthorForm } from '../../../../components/admin/authors'

const EditarAutorPage = () => {

    const [authorEdit, setAuthorEdit] = useState({})

    const router = useRouter()
    const { slug } = router.query
    
    const { showSideMenu } = useUI()


    const getAuthorBySlug = async() => {
        const { data } = await axios.get(`/api/public/authors/${ slug }`)
        setAuthorEdit(data)
        console.log( data )
    }

    useEffect(()=>{
        if( slug ){
            getAuthorBySlug()
        }
    },[slug])

    
    
    const [ values, handleInputChange, reset ] = useForm({
        name: '',
        facebook: '',
        twitter: '',
        instagram: '',
        email: '',
        phone: '',
        web: '',
        occupation: '',
        description: '',
        photo: '',
    })

    return (
        <AdminLayout title="- Editar" >
            <div className="mb-5 flex gap-2 items-center py-3">
                <TitlePage title="Editando..." />
            </div>

            <AuthorForm author={authorEdit}/>

        </AdminLayout>
    )
}

export default EditarAutorPage