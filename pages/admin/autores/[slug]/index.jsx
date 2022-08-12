import NextLink from 'next/link'

import { TitlePage } from "../../../../components/admin"
import { AdminLayout } from "../../../../components/layouts/AdminLayout"
import { useUI } from '../../../../hooks/useUI'

const DetallesAutorPage = () => {

    const { showSideMenu } = useUI()

    return (
        <AdminLayout title="- Detalles" >
            <div className="mb-5 flex gap-2 items-center py-3">
                <TitlePage title="Norma Irene" />
            </div>
            <div className="flex flex-col sm:flex-row gap-10 sm:flex-wrap">
                <section className={`bg-white p-5 sm:p-10 rounded-md lg:order-2 min-w-[300px] ${showSideMenu ? 'w-full' : 'sm:w-[300px]'} lg:w-[350px]`}>
                    <div className="w-full mb-5">
                        <img
                            className="rounded-lg w-full"
                            src="https://zenix.dexignzone.com/xhtml/images/contacts/Untitled-3.jpg"
                            alt="" />
                    </div>
                    <div>
                        <h3 className="mb-5 font-semibold text-3xl">Redes Sociales</h3>
                        <a href='https://www.facebook.com/' rel="noopener noreferrer" target="_blank" className="flex items-end gap-1 mb-4">
                            <i className='bx bxl-facebook text-4xl'></i>
                            <span className='block text-3xl text-slate-600 p-2 hover:text-slate-900'>/normairene</span>
                        </a>
                        <a href='https://www.instagram.com/' rel="noopener noreferrer" target="_blank" className="flex items-end gap-1 mb-4">
                            <i className='bx bxl-twitter text-4xl'></i>
                            <span className='block text-3xl text-slate-600 p-2 hover:text-slate-900'>/normairene</span>
                        </a>
                        <a href='https://twitter.com/' rel="noopener noreferrer" target="_blank" className="flex items-center gap-1 mb-4">
                            <i className='bx bxl-instagram text-4xl'></i>
                            <span className='block text-3xl text-slate-600 p-2 hover:text-slate-900'>/normairene</span>
                        </a>
                        <a href='https://contextos-guerrero.vercel.app' rel="noopener noreferrer" target="_blank" className="flex items-center gap-1 mb-4">
                            <i className='bx bx-globe text-4xl'></i>
                            <span className='block text-3xl text-slate-600 p-2 hover:text-slate-900'>www.contextosguerrero.com</span>
                        </a>
                    </div>
                </section>
                <section className="bg-white p-5 sm:p-10 rounded-md lg:order-1 flex-1">
                    <h2 className="mb-10 font-semibold text-4xl">Datos:</h2>
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between">
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="">Nombre</label>
                            <p className='text-3xl font-bold p-5 border border-dashed border-slate-200 bg-white rounded-md'>Norma Irene</p>
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="">Correo</label>
                            <p className='text-3xl font-bold p-5 border border-dashed border-slate-200 bg-white rounded-md'>correo@mail.com</p>
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="">Telefono</label>
                            <p className='text-3xl font-bold p-5 border border-dashed border-slate-200 bg-white rounded-md'>---------</p>
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="">Ocupación/Profesión</label>
                            <p className='text-3xl font-bold p-5 border border-dashed border-slate-200 bg-white rounded-md'>Economista</p>
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full">
                            <label htmlFor="">Descripción</label>
                            <textarea
                                name=""
                                id=""
                                value={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deserunt aspernatur neque excepturi facere repellendus autem, porro eligendi alias, quibusdam eveniet. Iure cumque neque iusto numquam, dolorem quo veritatis ducimus!'}
                                cols="30"
                                rows="10"
                                className="border border-dashed border-slate-200 bg-white rounded-md flex-1 p-5 leading-10"
                                disabled >
                            </textarea>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end w-full mb-5 gap-5 mt-5">

                        <button className='bg-red-700 hover:bg-red-600 px-8 py-5 font-semibold rounded-md color-admin w-full sm:w-auto flex justify-center gap-3 order-2 sm:order-1'>
                            <i className='bx bx-trash text-4xl'></i>
                            Eliminar
                        </button>
                        <NextLink href={`/admin/autores/${`norma-irene`}/editar`} passHref>
                            <a className='bg-sky-700 hover:bg-sky-600 px-12 py-5 font-semibold rounded-md color-admin w-full sm:w-auto flex justify-center gap-3 order-1 sm:order-2'>
                                <i className='bx bx-edit text-4xl'></i>
                                Editar
                            </a>
                        </NextLink>
                    </div>
                </section>
            </div>

        </AdminLayout>
    )
}

export default DetallesAutorPage