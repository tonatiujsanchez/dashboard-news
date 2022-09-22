import { useEffect, useRef, useState } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useForm } from "react-hook-form"

import { emailValidator } from "../../../utils/shared"
import { useData } from "../../../hooks/useData"
import { LoadingCircle } from "../ui"


export const UserForm = ({ userEdit = null }) => {

    const router = useRouter()
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

    // file of images
    const [photo, setPhoto] = useState(null)
    const [file, setFile] = useState(null)
    const [fileDataURL, setFileDataURL] = useState(null)


    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            role: 'editor',
            name: '',
            email: '',
            password: '',
            repitePassword: '',
        }
    })

    const { addNewUser, updateUser } = useData()

    const password = useRef({})
    password.current = watch("password", "")

    
    useEffect(()=>{
        if(userEdit){
            reset({
                role: userEdit.role,
                name: userEdit.name,
                email: userEdit.email,
                password: '',
                repitePassword: '',
            })
            setPhoto(userEdit.photo)
        }
    },[userEdit])


    const onCalcel = () => {
        router.back()
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


    // TODO: MODAL DE IMAGENES

    const onUserSubmit = async ({ role, name, email, password }) => {
        setLoadingSubmit(true)

        // TODO: Añadir foto

        if( userEdit ){
            // Editar
            const newUser = {
                ...userEdit,
                role,
                name,
                email,
            }
            const { hasError } = await updateUser(newUser)
            if(hasError){
                setLoadingSubmit(false)
                return
            }

        }else{
            // Nuevo
            const { hasError } = await addNewUser(role, name, email, password)
            if(hasError){
                setLoadingSubmit(false)
                return
            }
        }

        router.replace('/admin/usuarios')
    }



    return (
        <div className="py-5 mx-auto">
            <div className={` rounded-lg max-w-[200px] mx-auto ${photo && photo.length > 0 || fileDataURL ? '' : 'p-5'} `}>
                <div className={`w-full mb-5 relative ${photo && photo?.length > 0 || fileDataURL ? '' : 'border-2 border-dotted'}`}>
                    <img
                        className={`rounded-lg w-full ${photo && photo?.length > 0 || fileDataURL ? '' : 'p-12 opacity-50'}`}
                        src={fileDataURL || photo || "/assets/admin/imgs/drop-image.png"}
                        alt={userEdit?.name || ''} />
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
                                    onClick={()=>{}}
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
            <form onSubmit={handleSubmit(onUserSubmit)} className="max-w-[500px] mx-auto">
                <div className="my-7">
                    <label htmlFor="role" className="block text-md mb-3 font-semibold text-gray-500 uppercase">
                        Rol <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="role"
                        id="role"
                        className="w-full border border-gray-200 p-6 rounded-md"
                        {...register('role', {
                            required: 'El role es requerido',
                        })}
                    >

                        <option value="editor">Editor</option>
                        <option value="admin">Administrador</option>
                    </select>
                    {
                        !!errors.role &&
                        <p className="text-xl text-red-600 mt-2">{errors.role.message}</p>
                    }
                </div>
                <div className="my-7">
                    <label htmlFor="name" className="block text-md mb-3 font-semibold text-gray-500 uppercase">
                        Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="border mt-2 block w-full p-6 rounded-md shadow-sm focus:outline-slate-800 text-md"
                        {...register('name', {
                            required: 'El nombre es requerido'
                        })}
                    />
                    {
                        !!errors.name &&
                        <p className="text-xl text-red-600 mt-2">{errors.name.message}</p>
                    }
                </div>
                <div className="my-7">
                    <label htmlFor="email" className="block text-md mb-3 font-semibold text-gray-500 uppercase">
                        Correo <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        {...register('email', {
                            required: 'El correro es requerido',
                            validate: emailValidator.isEmail
                        })}
                        className="border mt-2 block w-full p-6 rounded-md shadow-sm focus:outline-slate-800 text-md"
                    />
                    {
                        !!errors.email &&
                        <p className="text-xl text-red-600 mt-2">{errors.email.message}</p>
                    }
                </div>
                {
                 userEdit
                    ?<div className="text-2xl ml-2">
                        <NextLink href={`/admin/usuarios/cambiar-password/${userEdit._id}`} passHref>
                            <a className="text-blue-500 hover:text-blue-800">Cambiar contraseña</a>
                        </NextLink>
                    </div>    
                    :<>
                        <div className="my-7">
                            <label htmlFor="password" className="block text-md mb-3 font-semibold text-gray-500 uppercase">
                                Contraseña <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                {...register('password', {
                                    required: 'Contraseña requerida',
                                    minLength: { value: 6, message: 'Se requieren minimo 6 caracteres' }
                                })}
                                className="border mt-2 block w-full p-6 rounded-md shadow-sm focus:outline-slate-800 text-md"
                            />
                            {
                                !!errors.password &&
                                <p className="text-xl text-red-600 mt-2">{errors.password.message}</p>
                            }
                        </div>
                        <div className="my-7">
                            <label htmlFor="repitePassword" className="block text-md mb-3 font-semibold text-gray-500 uppercase">
                                Repite Contraseña <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="repitePassword"
                                id="repitePassword"
                                {...register('repitePassword', {
                                    required: 'Repite la contraseña',
                                    minLength: { value: 6, message: 'Se requieren minimo 6 caracteres' },
                                    validate: value => value === password.current || "Las contraseñas no coinsiden"
                                })}
                                className="border mt-2 block w-full p-6 rounded-md shadow-sm focus:outline-slate-800 text-md"
                            />
                            {
                                !!errors.repitePassword &&
                                <p className="text-xl text-red-600 mt-2">{errors.repitePassword.message}</p>
                            }
                        </div>
                    </>
                }
                <div className="flex items-center justify-end gap-2 mt-10">
                    <button
                        type="button"
                        disabled={loadingSubmit}
                        onClick={onCalcel}
                        className="py-3 px-5 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors">
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loadingSubmit}
                        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors min-w-[100px] flex justify-center disabled:bg-sky-300">
                        { loadingSubmit 
                            ? <LoadingCircle />
                            : <span>
                                { userEdit ? 'Editar' : 'Añadir'}
                                </span>
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}
