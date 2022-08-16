import Image from 'next/image'
import NextLink from 'next/link'
import { useState } from 'react'

import Modal from 'react-modal'

import { useData } from '../../../hooks/useData'

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


export const AuthorCard = ({ author }) => {


    const [modalDelete, setModalDelete] = useState(false)

    const { deleteAuthor } = useData()

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
        deleteAuthor(author._id)
        hiddenModalDelete()
    }

    return (
        <>
            <div className="w-full sm:w-[310px] bg-white shadow-md px-10 py-12 rounded-xl">
                <div className='flex gap-5 mb-5'>
                    <NextLink href={`/admin/autores/${author.slug}`} passHref>
                        <a className="block w-[100px] min-w-[100px] relative h-[100px] rounded-lg overflow-hidden group border-white border-8 shadow-lg">
                            <div className='relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 h-80 lg:aspect-none'>
                                <Image
                                    priority="true"
                                    layout='responsive'
                                    width={100}
                                    height={100}
                                    objectFit="cover"
                                    objectPosition="top"
                                    src={author.photo || '/assets/admin/imgs/no-image-author.png'}
                                    alt={author.name}
                                />
                            </div>
                        </a>
                    </NextLink>
                    <div>
                        <NextLink href={`/admin/autores/${author.slug}`} passHref>
                            <a className="block font-bold mb-2 mt-1">{author.name}</a>
                        </NextLink>
                        <p className='text-slate-500 font-semibold'>{author.occupation}</p>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-7 mt-10'>
                    <a href={`https://www.facebook.com/${author.facebook}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className={`flex items-end gap-1 mb-4 text-4xl text-gray-800 p-2 hover:bg-slate-200 rounded-full ${author.facebook.length > 0 ? '' : 'pointer-events-none opacity-40'}`}>
                        <i className='bx bxl-facebook-circle' ></i>
                    </a>
                    <a href={`https://www.twitter.com/${author.twitter}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className={`flex items-end gap-1 mb-4 text-4xl text-gray-800 p-2 hover:bg-slate-200 rounded-full ${author.twitter.length > 0 ? '' : 'pointer-events-none opacity-40'}`}>
                        <i className='bx bxl-twitter' ></i>
                    </a>
                    <a href={`https://www.instagram.com/${author.instagram}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className={`flex items-end gap-1 mb-4 text-4xl text-gray-800 p-2 hover:bg-slate-200 rounded-full ${author.instagram.length > 0 ? '' : 'pointer-events-none opacity-40'}`}>
                        <i className='bx bxl-instagram-alt' ></i>
                    </a>
                </div>
                <div className="flex flex-col">
                    <p className="border-b py-5">
                        <span className='font-semibold'>Correo:</span> {author.email.length > 0 ? author.email : <span className='opacity-40 font-normal text-slate-400'>--------------------</span>}
                    </p>
                    <p className="border-b py-5">
                        <span className='font-semibold'>Telefono:</span> {author.phone.length > 0 ? author.phone : <span className='opacity-40 font-normal text-slate-400'>--------------------</span>}
                    </p>
                </div>
                <div className='mt-10 flex justify-between gap-5'>
                    <div className='flex gap-5'>
                        <button
                            onClick={showModalDelete}
                            className="flex items-center text-red-600 hover:text-white bg-red-100 hover:bg-red-500 font-bold text-3xl py-2 px-3 rounded-md">
                            <i className='bx bx-trash'></i>
                        </button>
                        <NextLink href={`/admin/autores/${author.slug}/editar`} passHref>
                            <a className="flex items-center text-sky-600 hover:text-white bg-sky-100 hover:bg-sky-500 font-bold text-3xl py-2 px-3 rounded-md">
                                <i className='bx bx-edit-alt' ></i>
                            </a>
                        </NextLink>
                    </div>
                    <div>
                        <NextLink href={`/admin/autores/${author.slug}`} passHref>
                            <a className="flex gap-1 text-emerald-600 hover:text-white bg-emerald-100 hover:bg-emerald-500 py-2 px-5 rounded-md">
                                <i className='bx bx-show text-4xl'></i> <span className='font-semibold'>Ver</span>
                            </a>
                        </NextLink>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalDelete}
                style={customStyles}>
                <div className="p-5">
                    <header className="text-center">
                        <div className='text-center text-7xl mb-2 text-red-600'>
                            <i className='bx bx-trash'></i>
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

        </>
    )
}
