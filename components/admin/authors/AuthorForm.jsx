import { useEffect, useState } from "react"

import { useRouter } from 'next/router'


import { useCustomForm } from "../../../hooks/useCustomForm"
import { useUI } from "../../../hooks/useUI"
import { useData } from "../../../hooks/useData"

import Modal from 'react-modal'
import { AuthorImages } from "./AuthorImages"

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


export const AuthorForm = ({ author = null }) => {

    const [showOptions, setShowOptions] = useState(false)
    const [showImagesModal, setShowImagesModal] = useState(false)

    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);


    const router = useRouter()

    const { showSideMenu } = useUI()
    const { addNewAuthor, updateAuthor } = useData()

    const [values, handleInputChange, reset] = useCustomForm({
        name: '',
        facebook: '',
        twitter: '',
        instagram: '',
        email: '',
        phone: '',
        web: '',
        occupation: '',
        description: '',
        photo: '',
    })

    const {
        name,
        facebook,
        twitter,
        instagram,
        email,
        phone,
        web,
        occupation,
        description,
        photo
    } = values

    useEffect(() => {
        if (author) {
            // reset({
            //     name: author.name,
            //     facebook: author.facebook,
            //     twitter: author.twitter,
            //     instagram: author.instagram,
            //     email: author.email,
            //     phone: author.phone,
            //     web: author.web,
            //     occupation: author.occupation,
            //     description: author.description,
            //     photo: author.photo,
            // })
            console.log('Editando...')
        } else {
            console.log('Nuevo')
        }
    }, [author])

    const onCalcel = () => {
        router.back()
    }

    const hiddenImagesModal = () => {
        const body = document.querySelector('body')
        body.classList.remove('fixed-body')
        setShowImagesModal(false)
        setShowOptions(false)
    }

    const openImagesModal = () => {
        const body = document.querySelector('body')
        body.classList.add('fixed-body')
        setShowImagesModal(true)
    }


    const setImagePreview = (file, urlImage) => {
        setFile(file)
        setFileDataURL(urlImage)
        console.log({
            file,
            urlImage
        });
        console.log( typeof urlImage );
        hiddenImagesModal()
    }

    const onSave = () => {

        if( name.trim().length <= 0 ){
            console.log('El nombre es necesario');
            return
        }

        const newAuthor = {
            ...author,
            name,
            facebook,
            twitter,
            instagram,
            email,
            phone,
            web,
            occupation,
            description,
            photo,
        }

        if (author) {
            updateAuthor(newAuthor)
            router.push('/admin/autores')
        } else {
            addNewAuthor(newAuthor)
            router.push('/admin/autores')
        }
    }



    return (
        <>
            <div className="flex flex-col sm:flex-row gap-10 sm:flex-wrap">
                <section className={`bg-white p-5 sm:p-10 rounded-md lg:order-2 min-w-[300px] ${showSideMenu ? 'w-full' : 'sm:w-[300px]'} lg:w-[350px]`}>
                    <div className={` rounded-lg w-full ${photo && photo.length > 0 || fileDataURL ? '' : 'p-20'} `}>
                        <div className={`w-full mb-5 relative ${photo && photo?.length > 0 || fileDataURL ? '' : 'border-2 border-dotted'}`}>
                            <img
                                className={`rounded-lg w-full ${photo && photo?.length > 0 || fileDataURL ? '' : 'p-20 opacity-50'}`}
                                src={ fileDataURL || photo || "/assets/admin/imgs/drop-image.png"}
                                alt={name} />
                            <button
                                onClick={() => setShowOptions(!showOptions)}
                                className="flex justify-center items-center absolute right-[-10px] bottom-[-10px] text-3xl bg-admin text-sky-700 py-2 px-2 rounded-full shadow border hover:bg-sky-600 hover:text-white hover:border-sky-600">
                                <i className='bx bxs-camera'></i>
                            </button>
                            {
                                showOptions &&
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
                                    <div className="py-2" role="none">
                                        <button
                                            onClick={ openImagesModal } 
                                            className="w-full text-left text-gray-700 flex items-center gap-2 px-4 py-3 text-xl hover:bg-gray-100 hover:text-gray-900">
                                            <i className='bx bx-image-alt text-3xl'></i>
                                            <span>Actualizar foto</span>
                                        </button>
                                        <button className="w-full text-left text-gray-700 flex items-center gap-2 px-4 py-3 text-xl hover:bg-gray-100 hover:text-gray-900">
                                            <i className='bx bx-trash text-red-600 text-3xl'></i>
                                            <span>Quitar foto</span>
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-5 font-semibold text-3xl">Redes Sociales</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <i className='bx bxl-facebook text-4xl'></i>
                            <input
                                type="text"
                                id="facebook"
                                name="facebook"
                                value={facebook}
                                onChange={handleInputChange}
                                className="bg-admin rounded-md flex-1 border p-3" />
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <i className='bx bxl-twitter text-4xl'></i>
                            <input
                                type="text"
                                id="twitter"
                                name="twitter"
                                value={twitter}
                                onChange={handleInputChange}
                                className="bg-admin rounded-md flex-1 border p-3" />
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <i className='bx bxl-instagram text-4xl'></i>
                            <input
                                type="text"
                                id="instagram"
                                name="instagram"
                                value={instagram}
                                onChange={handleInputChange}
                                className="bg-admin rounded-md flex-1 border p-3" />
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <i className='bx bx-globe text-4xl'></i>
                            <input
                                type="text"
                                id="web"
                                name="web"
                                value={web}
                                onChange={handleInputChange}
                                className="bg-admin rounded-md flex-1 border p-3" />
                        </div>
                    </div>
                </section>
                <section className="bg-white p-5 sm:p-10 rounded-md sm:order-1 flex-1">
                    <h2 className="mb-10 font-semibold text-4xl">Datos:</h2>
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between">
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                className="bg-admin rounded-md flex-1 border p-5" />
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="email">Correo</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                className="bg-admin rounded-md flex-1 border p-5" />
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="phone">Telefono</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={handleInputChange}
                                className="bg-admin rounded-md flex-1 border p-5" />
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full lg:w-[48%]">
                            <label htmlFor="occupation">Ocupación/Profesión</label>
                            <input
                                type="text"
                                id="occupation"
                                name="occupation"
                                value={occupation}
                                onChange={handleInputChange}
                                className="bg-admin rounded-md flex-1 border p-5" />
                        </div>
                        <div className="flex flex-col gap-2 mb-4 w-full">
                            <label htmlFor="description">Descripción</label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                                cols="30"
                                rows="10"
                                className="bg-admin rounded-md flex-1 border p-5" >
                            </textarea>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 mt-5">
                        <button
                            onClick={onCalcel}
                            className="py-3 px-5 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors">
                            Cancelar
                        </button>
                        <button
                            onClick={onSave}
                            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors">
                            Guardar
                        </button>
                    </div>
                </section>
            </div>
            <Modal
                isOpen={showImagesModal}
                style={customStyles}>
                    <AuthorImages 
                        hiddenImagesModal={hiddenImagesModal}
                        setImagePreview={setImagePreview} />
            </Modal>
        </>
    )
}
