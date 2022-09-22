import { useEffect, useRef, useState } from "react"

import { useRouter } from "next/router"

import { useForm } from "react-hook-form"

import { LoadingCircle, TitlePage } from "../../../../components/admin/ui"
import { AdminLayout } from "../../../../components/layouts"

import { useData } from "../../../../hooks/useData"


const CambiarPasswordPage = () => {

    const router = useRouter()
    const [user, setUser] = useState({})
    const [loadingPassword, setLoadingPassword] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const password = useRef({})
    password.current = watch("password", "")


    const { users, updatePassword } = useData()

    useEffect(() => {
        const user = users.find(user => user._id === router.query.id)
        if (user) {
            setUser({ ...user })
        } else {
            router.back()
        }
    }, [users])

    const onCalcel = () => {
        router.back()
    }

    const onPasswordSubmit = async ({ password }) => {

        setLoadingPassword(true)

        const { hasError } = await updatePassword(user._id, password)
    
        if(hasError){
            setLoadingPassword(false)
            return
        }

        router.replace('/admin/usuarios')
    }


    return (
        <AdminLayout title="- Editar usuario" >
            <div className="mb-5 flex flex-col gap-2 items-start py-3">
                <TitlePage title="Cambiar contraseña" />
                <p>Cambiando contraseña de: <strong>{user.name}</strong></p>
            </div>
            <form onSubmit={handleSubmit(onPasswordSubmit)} className="max-w-[500px] mx-auto mt-16">
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
                <div className="flex items-center sm:justify-end gap-2 mt-10">
                    <button
                        type="button"
                        disabled={loadingPassword}
                        onClick={onCalcel}
                        className="py-3 px-5 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors disabled:cursor-default">
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loadingPassword}
                        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 uppercase w-full sm:w-auto rounded-md cursor-pointer transition-colors min-w-[100px] flex justify-center disabled:bg-sky-300 disabled:cursor-default">
                        {loadingPassword
                            ? <LoadingCircle />
                            : <span>Cambiar</span>
                        }
                    </button>
                </div>
            </form>
        </AdminLayout>
    )


}

export default CambiarPasswordPage