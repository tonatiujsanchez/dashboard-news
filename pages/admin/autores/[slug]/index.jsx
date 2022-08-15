import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import NextLink from 'next/link'

import axios from 'axios'

import { LoadingAdmin, TitlePage } from "../../../../components/admin/ui"
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
    const [loading, setLoading] = useState(false)


    const router = useRouter()
    const { slug } = router.query

    const { showSideMenu } = useUI()


    const getAuthorBySlug = async () => {
        setLoading(true)
        const { data } = await axios.get(`/api/public/authors/${slug}`)
        setAuthor(data)
        setLoading(false)

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

            {
                loading
                    ? <div className="flex justify-center mt-96">
                        <LoadingAdmin />
                    </div>
                    :
                    <>
                        <div className="mb-5 flex gap-2 items-center py-3">
                            <TitlePage title={author.name} />
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
                                    <p className="flex items-center gap-1 mb-4">
                                        <i className='bx bxl-facebook text-4xl'></i>
                                        {
                                            author.facebook && author.facebook.length > 0
                                                ?
                                                <>
                                                    <span className='block text-slate-700 p-2 text-3xl mb-2'>/ {author.facebook}</span>
                                                    <a href='https://www.facebook.com/' rel="noopener noreferrer" target="_blank" className='opacity-70 text-3xl'>
                                                        <i className='bx bx-link-external'></i>
                                                    </a>
                                                </>
                                                : <span className='opacity-40 font-normal text-slate-400'> ----------------------------------------</span>
                                        }
                                    </p>
                                    <p className="flex items-center gap-1 mb-4">
                                        <i className='bx bxl-twitter text-4xl'></i>
                                        {
                                            author.twitter && author.twitter.length > 0
                                                ? <>
                                                    <span className='block text-slate-700 p-2 text-3xl mb-2'>/ {author.twitter}</span>
                                                    <a href='https://www.facebook.com/' rel="noopener noreferrer" target="_blank" className='opacity-70 text-3xl'>
                                                        <i className='bx bx-link-external'></i>
                                                    </a>
                                                </>
                                                : <span className='opacity-40 font-normal text-slate-400'> ----------------------------------------</span>
                                        }
                                    </p>
                                    <p className="flex items-center gap-1 mb-4">
                                        <i className='bx bxl-instagram text-4xl'></i>
                                        {
                                            author.instagram && author.instagram.length > 0
                                                ? <>
                                                    <span className='block text-slate-700 p-2 text-3xl mb-2'>/ {author.instagram}</span>
                                                    <a href='https://www.facebook.com/' rel="noopener noreferrer" target="_blank" className='opacity-70 text-3xl'>
                                                        <i className='bx bx-link-external'></i>
                                                    </a>
                                                </>
                                                : <span className='opacity-40 font-normal text-slate-400'> ----------------------------------------</span>
                                        }
                                    </p>
                                    <p className="flex items-center gap-1 mb-4">
                                        <i className='bx bx-globe text-4xl'></i>
                                        {
                                            author?.web && author.web.length > 0
                                                ? <>
                                                    <span className='block text-slate-700 p-2 text-3xl mb-2'>{author.web}</span>
                                                    <a href='https://www.facebook.com/' rel="noopener noreferrer" target="_blank" className='opacity-70 text-3xl'>
                                                        <i className='bx bx-link-external'></i>
                                                    </a>
                                                </>
                                                : <span className='opacity-40 font-normal text-slate-400'> ----------------------------------------</span>
                                        }
                                    </p>
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
                                        <p className='text-3xl font-bold p-5 border border-dashed border-slate-200 bg-white rounded-md'>{author.email || <span className='opacity-40 font-normal text-slate-400'>--------------------</span>}</p>
                                    </div>
                                    <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                                        <label htmlFor="">Telefono</label>
                                        <p className='text-3xl font-bold p-5 border border-dashed border-slate-200 bg-white rounded-md'>{author.phone || <span className='opacity-40 font-normal text-slate-400'>--------------------</span>}</p>
                                    </div>
                                    <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                                        <label htmlFor="">Ocupación/Profesión</label>
                                        <p className='text-3xl font-bold p-5 border border-dashed border-slate-200 bg-white rounded-md'>{author.occupation || <span className='opacity-40 font-normal text-slate-400'>--------------------</span>}</p>
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
                    </>
            }

            <Modal
                isOpen={modalDelete}
                style={customStyles}>
                <div className="p-5">
                    <header className="text-center">
                        <div className='text-center text-7xl mb-2 text-red-600'>
                            <i class='bx bx-trash'></i>
                        </div>
                        <h3 className='font-bold text-4xl mb-5'>Eliminar autor</h3>
                        <p className="text-center text-2xl mb-2">{`Desea eliminar a: ${author.name}`}</p>
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


        </AdminLayout>
    )
}

export default DetallesAutorPage