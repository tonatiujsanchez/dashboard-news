import { ArticleForm } from "../../../components/admin/articles"
import { TitlePage } from "../../../components/admin/ui"
import { AdminLayout } from "../../../components/layouts"


const newArticlePage = () => {
    return (
        <AdminLayout title="- Nuevo artículo" >
            <section className="py-3">
                <TitlePage title="Nuevo artículo" />
            </section>
            <ArticleForm />
        </AdminLayout>
    )
}

export default newArticlePage