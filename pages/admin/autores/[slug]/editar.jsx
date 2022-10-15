import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { AdminLayout } from "../../../../components/layouts/AdminLayout"
import { LoadingAdmin, TitlePage } from "../../../../components/admin/ui"
import { AuthorForm } from '../../../../components/admin/authors'

import { useData } from '../../../../hooks/useData'

const EditarAutorPage = () => {

    const [authorEdit, setAuthorEdit] = useState({})
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { slug } = router.query

    const { authors } = useData()

    const getAuthorBySlug = async () => {
        setLoading(true)
        const authorEdit = authors.find( author => author.slug === slug )
        if(!authorEdit){
            setLoading(false)
            router.push('/admin/autores')
            return
        }
        setAuthorEdit(authorEdit)
        setLoading(false)
    }

    useEffect(() => {
        if (slug) {
            getAuthorBySlug()
        }
    }, [slug])


    return (
        <AdminLayout title="- Editar" >
            {
                loading && authors.length <= 0 
                    ? <div className="flex justify-center mt-96">
                        <LoadingAdmin />
                    </div>
                    :
                    <>
                        <div className="mb-5 flex gap-2 items-center py-3">
                            <TitlePage title={`Editando a ${authorEdit.name}`} />
                        </div>
                        <AuthorForm author={authorEdit} />
                    </>
            }
        </AdminLayout>
    )
}

export default EditarAutorPage