import { useState } from "react"

import { BtnSuccess, LoadingAdmin } from "../../../components/admin/ui"
import { TitlePage } from "../../../components/admin/ui"
import { AdminLayout } from "../../../components/layouts/AdminLayout"


const images = [
    {
        name: '',
        url: '',
        size: '',
        format: '',
        section: 'articles',
    }
]

const buttonsNav = [
    {
        title: 'Articulos',
        id: 'articles'
    },
    {
        title: 'Autores',
        id: 'authors'
    },
    {
        title: 'Usuarios',
        id: 'users'
    },
]


const MultimediaPage = () => {

    const [loading, setLoading] = useState(false)
    const [buttonActive, setButtonActive] = useState(buttonsNav[0].id)



    const loadMultimedia = () => {
        console.log('Cargando imagenes...');
    }


    return (
        <AdminLayout title="- Multimedia" >
            <div className="mb-5 flex gap-2 items-center py-3">
                <TitlePage title="Multimedia" />
                <button
                    className="text-3xl text-slate-600 hover:bg-slate-200 hover:text-slate-900 py-2 px-3 rounded-full active:scale-95"
                    onClick={() => loadMultimedia()}>
                    <i className='bx bx-revision'></i>
                </button>
            </div>
            {
                loading
                    ? <div className="flex justify-center mt-96">
                        <LoadingAdmin />
                    </div>
                    : <section>
                        <div className="w-full mb-5 flex flex-col gap-5 sm:flex-row sm:justify-between">
                            <div className="">
                                <BtnSuccess text="Subir imagenes" />
                            </div>
                            <div className="flex items-center justify-center gap-2 lg:gap-5">
                                {
                                    buttonsNav.map(btn => {
                                        return (
                                            <button
                                                key={btn.id}
                                                className={`${buttonActive === btn.id ? 'bg-slate-100 shadow-md' : 'bg-white'} rounded-lg py-3 px-6 sm:px-10 lg:px-16 font-semibold border hover:bg-slate-100 flex-1`}
                                            >
                                                {btn.title}
                                            </button>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div>
                            {/* {
                                categoriesMemo.map(category => (
                                    <CategoryItem
                                        key={category._id}
                                        category={category}
                                        onEditCategory={onEditCategory}
                                    />
                                ))

                            } */}
                        </div>
                        <div className="flex justify-end">
                            <p>Paginación</p>
                        </div>
                    </section>
            }

        </AdminLayout>
    )
}

export default MultimediaPage