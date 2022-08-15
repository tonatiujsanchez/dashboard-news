import { useEffect } from "react"

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { useForm } from "../../../hooks/useForm"
import { useUI } from "../../../hooks/useUI"

export const AuthorForm = ({ author = null }) => {

    const router = useRouter()

    const { showSideMenu } = useUI()

    const [values, handleInputChange, reset] = useForm({
        name: '',
        facebook: '',
        twitter: '',
        instagram: '',
        email: '',
        phone: '',
        web: '',
        occupation: '',
        description: '',
        // photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
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
            reset({
                name: author.name,
                facebook: author.facebook,
                twitter: author.twitter,
                instagram: author.instagram,
                email: author.email,
                phone: author.phone,
                web: author.web,
                occupation: author.occupation,
                description: author.description,
                photo: author.photo,
            })
            console.log('Editando...')
        } else {
            console.log('Nuevo')
        }
    }, [author])

    const onCalcel = () => {
        router.back()
    }


    return (
        <div className="flex flex-col sm:flex-row gap-10 sm:flex-wrap">
            <section className={`bg-white p-5 sm:p-10 rounded-md lg:order-2 min-w-[300px] ${showSideMenu ? 'w-full' : 'sm:w-[300px]'} lg:w-[350px]`}>
                <div className={` rounded-lg w-full ${photo && photo.length > 0 ? '' : 'p-20'} `}>
                    <div className={`w-full mb-5 relative ${photo && photo?.length > 0 ? '' : 'border-2 border-dotted'}`}>
                        <img
                            className={`rounded-lg w-full ${photo && photo?.length > 0 ? '' : 'p-20 opacity-50'}`}
                            src={photo || "/assets/admin/imgs/drop-image.png"}
                            alt={name} />
                        <button className="flex justify-center items-center absolute right-[-10px] bottom-[-10px] text-3xl bg-admin text-sky-700 py-2 px-2 rounded-full shadow border hover:bg-sky-600 hover:text-white hover:border-sky-600">
                            <i className='bx bxs-camera'></i>
                        </button>
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
                        type="submit"
                        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors">
                        Guardar
                    </button>
                </div>

            </section>
        </div>
    )
}
