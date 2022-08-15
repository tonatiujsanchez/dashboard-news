import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import axios from 'axios'

import { AdminLayout } from "../../../../components/layouts/AdminLayout"
import { LoadingAdmin, TitlePage } from "../../../../components/admin/ui"
import { AuthorForm } from '../../../../components/admin/authors'

const EditarAutorPage = () => {

    const [authorEdit, setAuthorEdit] = useState({})
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { slug } = router.query


    const getAuthorBySlug = async () => {
        setLoading(true)
        const { data } = await axios.get(`/api/public/authors/${slug}`)
        setAuthorEdit(data)
        setLoading(false)
    }

    useEffect(() => {
        if (slug) {
            getAuthorBySlug()
        }
    }, [slug])


    return (
        <AdminLayout title="- Editar" >
            <div className="mb-5 flex gap-2 items-center py-3">
                <TitlePage title={`Editando a ${ authorEdit.name }`} />
            </div>
            {
                loading
                    ? <div className="flex justify-center mt-96">
                        <LoadingAdmin />
                    </div>
                    : <AuthorForm author={authorEdit} />
            }
        </AdminLayout>
    )
}

export default EditarAutorPage