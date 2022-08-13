import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import NextLink from 'next/link'

import axios from 'axios'

import { TitlePage } from "../../../../components/admin/ui"
import { AdminLayout } from "../../../../components/layouts/AdminLayout"
import { useUI } from '../../../../hooks/useUI'


import Modal from 'react-modal'

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#__next')




const DetallesAutorPage = () => {

    const [author, setAuthor] = useState({})
    const [modalDelete, setModalDelete] = useState(false)

    const router = useRouter()
    const { slug } = router.query

    const { showSideMenu } = useUI()


    const getAuthorBySlug = async () => {
        const { data } = await axios.get(`/api/public/authors/${slug}`)
        setAuthor(data)
    }

    useEffect(() => {
        if (slug) {
            getAuthorBySlug()
        }
    }, [slug])


    

    const showModalDelete = () => {
        const body = document.querySelector('body')
        body.classList.add('fixed-body')
        setModalDelete(true)
    }

    const hiddenModalDelete = () => {
        const body = document.querySelector('body')
        body.classList.remove('fixed-body')
        setModalDelete(false)
    }

    const onDeleteAuthor = () => {
        // TODO: Eliminar 
        console.log('Eliminando a...', author.name);
        hiddenModalDelete()
        router.push('/admin/autores')
    }


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
                            src={author.photo}
                            alt={author.name} />
                    </div>
                    <div>
                        <h3 className="mb-5 font-semibold text-3xl">Redes Sociales</h3>
                        <a href='https://www.facebook.com/' rel="noopener noreferrer" target="_blank" className="flex items-end gap-1 mb-4">
                            <i className='bx bxl-facebook text-4xl'></i>
                            <span className='block text-slate-600 p-2 hover:text-slate-900'>/{author.facebook}</span>
                        </a>
                        <a href='https://www.instagram.com/' rel="noopener noreferrer" target="_blank" className="flex items-end gap-1 mb-4">
                            <i className='bx bxl-twitter text-4xl'></i>
                            <span className='block text-slate-600 p-2 hover:text-slate-900'>/{author.twitter}</span>
                        </a>
                        <a href='https://twitter.com/' rel="noopener noreferrer" target="_blank" className="flex items-center gap-1 mb-4">
                            <i className='bx bxl-instagram text-4xl'></i>
                            <span className='block text-slate-600 p-2 hover:text-slate-900'>/{author.instagram}</span>
                        </a>
                        <a href='https://contextos-guerrero.vercel.app' rel="noopener noreferrer" target="_blank" className="flex items-center gap-1 mb-4">
                            <i className='bx bx-globe text-4xl'></i>
                            <span className='block text-slate-600 p-2 hover:text-slate-900'>{author.web}</span>
                        </a>
                    </div>
                </section>
                <section className="bg-white p-5 sm:p-10 rounded-md lg:order-1 flex-1">
                    <h2 className="mb-10 font-semibold text-4xl">Datos:</h2>
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between">
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="">Nombre</label>
                            <p className='text-3xl font-bold p-5 border border-dashed border-slate-200 bg-white rounded-md'>{author.name}</p>
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="">Correo</label>
                            <p className='text-3xl font-bold p-5 border border-dashed border-slate-200 bg-white rounded-md'>{author.email}</p>
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="">Telefono</label>
                            <p className='text-3xl font-bold p-5 border border-dashed border-slate-200 bg-white rounded-md'>{author.phone}</p>
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="">Ocupación/Profesión</label>
                            <p className='text-3xl font-bold p-5 border border-dashed border-slate-200 bg-white rounded-md'>{author.occupation}</p>
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full">
                            <label htmlFor="">Descripción</label>
                            <textarea
                                name=""
                                id=""
                                value={author.description}
                                cols="30"
                                rows="10"
                                className="border border-dashed border-slate-200 bg-white rounded-md flex-1 p-5 leading-10"
                                disabled >
                            </textarea>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end w-full mb-5 gap-5 mt-5">

                        <button
                            onClick={showModalDelete} 
                            className='text-red-600 hover:text-white bg-red-100 hover:bg-red-500 px-8 py-5 font-semibold rounded-md w-full sm:w-auto flex justify-center gap-3 order-2 sm:order-1'>
                            <i className='bx bx-trash text-4xl'></i>
                            Eliminar
                        </button>
                        <NextLink href={`/admin/autores/${author.slug}/editar`} passHref>
                            <a className='text-sky-600 hover:text-white bg-sky-100 hover:bg-sky-500 px-12 py-5 font-semibold rounded-md w-full sm:w-auto flex justify-center gap-3 order-1 sm:order-2'>
                                <i className='bx bx-edit text-4xl'></i>
                                Editar
                            </a>
                        </NextLink>
                    </div>
                </section>
            </div>

            {
                modalDelete &&
                <Modal
                    isOpen={modalDelete}
                    style={customStyles}>
                    <div className="p-5">
                        <header className="text-center">
                            <p className="text-center text-3xl mb-2">{`Desea eliminar a:`}</p>
                            <h3 className='font-semibold text-3xl'>{author.name}</h3>
                        </header>
                        <div className='flex items-center justify-center gap-2 mt-10'>
                            <button
                                onClick={hiddenModalDelete}
                                className="py-3 px-5 uppercase w-full rounded-md cursor-pointer transition-colors">
                                Cancelar
                            </button>
                            <button
                                onClick={onDeleteAuthor}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 uppercase w-full rounded-md cursor-pointer transition-colors">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </Modal>
            }

        </AdminLayout>
    )
}

export default DetallesAutorPage