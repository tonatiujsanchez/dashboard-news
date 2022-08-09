import React from 'react'
import { TitlePage } from '../../components/admin'
import { AdminLayout } from '../../components/layouts'


const AdminPage = () => {
    return (
        <AdminLayout>
            <TitlePage title="Dashboard" />
        </AdminLayout>
    )
}

export default AdminPage