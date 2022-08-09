import { TitlePage } from "../../components/admin"
import { AdminLayout } from "../../components/layouts"


const newArticlePage = () => {
    return (
        <AdminLayout title="- Nuevo artículo" >
            <TitlePage title="Nuevo artículo" />
        </AdminLayout>
    )
}

export default newArticlePage