import { TitlePage } from '../../../components/admin/ui'
import { UserForm } from '../../../components/admin/users'
import { AdminLayout } from '../../../components/layouts'

const NuevoUsuarioPage = () => {


    return (
        <AdminLayout title="- Nuevo usuario" >
            <div className="mb-5 flex gap-2 items-center py-3">
                <TitlePage title="Nuevo usuario" />
            </div>
            <UserForm />
        </AdminLayout>
    )
}

export default NuevoUsuarioPage