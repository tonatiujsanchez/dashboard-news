import NextLink from 'next/link'

import { TitlePage } from "../../../components/admin"
import { AdminLayout } from "../../../components/layouts/AdminLayout"
import { useUI } from '../../../hooks/useUI'

const NuevoAutorPage = () => {
    const { showSideMenu } = useUI()
    return (
        <AdminLayout title="- Nuevo Autor" >
            <div className="mb-5 flex gap-2 items-center py-3">
                <TitlePage title="Nuevo autor" />
            </div>

            <div className="flex flex-col sm:flex-row gap-10 sm:flex-wrap">
                <section className={`bg-white p-5 sm:p-10 rounded-md lg:order-2 min-w-[300px] ${showSideMenu ? 'w-full' : 'sm:w-[300px]'} lg:w-[350px]`}>
                    <div className="w-full mb-5">
                        <img
                            className="rounded-lg w-full"
                            src="https://zenix.dexignzone.com/xhtml/images/profile/port.jpg"
                            alt="" />
                    </div>
                    <div>
                        <h3 className="mb-5 font-semibold text-3xl">Redes Sociales</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <i className='bx bxl-facebook text-4xl'></i>
                            <input type="text" className="bg-admin rounded-md flex-1 border p-3" />
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <i className='bx bxl-twitter text-4xl'></i>
                            <input type="text" className="bg-admin rounded-md flex-1 border p-3" />
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <i className='bx bxl-instagram text-4xl'></i>
                            <input type="text" className="bg-admin rounded-md flex-1 border p-3" />
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <i className='bx bx-globe text-4xl'></i>
                            <input type="text" className="bg-admin rounded-md flex-1 border p-3" />
                        </div>
                    </div>
                </section>
                <section className="bg-white p-5 sm:p-10 rounded-md sm:order-1 flex-1">
                    <h2 className="mb-10 font-semibold text-4xl">Datos:</h2>
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between">
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="">Nombre</label>
                            <input type="text" className="bg-admin rounded-md flex-1 border p-5" />
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="">Correo</label>
                            <input type="text" className="bg-admin rounded-md flex-1 border p-5" />
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="">Telefono</label>
                            <input type="text" className="bg-admin rounded-md flex-1 border p-5" />
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="">Ocupación/Profesión</label>
                            <input type="text" className="bg-admin rounded-md flex-1 border p-5" />
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full">
                            <label htmlFor="">Descripción</label>
                            <textarea
                                name=""
                                id=""
                                cols="30"
                                rows="10"
                                className="bg-admin rounded-md flex-1 border p-5" >

                            </textarea>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-5">
                        <NextLink href="/admin/autores" passHref>
                            <a                            
                                className="py-3 px-5 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors">
                                Cancelar
                            </a>
                        </NextLink>
                        <button
                            type="submit"
                            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors">
                            Guardar
                        </button>
                    </div>
                </section>
            </div>

        </AdminLayout>
    )
}

export default NuevoAutorPage