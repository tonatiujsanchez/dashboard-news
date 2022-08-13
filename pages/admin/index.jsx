import React from 'react'
import { TitlePage } from '../../components/admin/ui'
import { AdminLayout } from '../../components/layouts'


const AdminPage = () => {
    return (
        <AdminLayout title="- Dashboard">
            <TitlePage title="Dashboard" />
        </AdminLayout>
    )
}

export default AdminPage