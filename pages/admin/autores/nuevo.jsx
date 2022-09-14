import { useUI } from '../../../hooks/useUI'

import { AdminLayout } from "../../../components/layouts/AdminLayout"

import { TitlePage } from "../../../components/admin/ui"
import { AuthorForm } from '../../../components/admin/authors'

const NuevoAutorPage = () => {

    const { showSideMenu } = useUI()
    
    return (
        <AdminLayout title="- Nuevo Autor" >
            <div className="mb-5 flex gap-2 items-center py-3">
                <TitlePage title="Nuevo autor" />
            </div>
            <AuthorForm />
        </AdminLayout>
    )
}

export default NuevoAutorPage