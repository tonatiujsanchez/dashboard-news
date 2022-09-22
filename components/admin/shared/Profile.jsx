import NextLink from 'next/link'

import { useState } from "react"
import { useAuth } from "../../../hooks/useAuth"



export const Profile = () => {


    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const { user, logout } = useAuth()

    if(!user){
        return <></>
    }


    return (
        <div className="flex justify-end items-center gap-4 bg-white py-5 px-5 shadow">
            <p className="font-bold text-slate-700 capitalize">{user.name}</p>
            <div>
                <div
                    onClick={() => setShowProfileOptions(!showProfileOptions)} 
                    className="w-14 h-14 rounded-full overflow-hidden relative cursor-pointer group border">
                    <img
                        src={ user.photo ? user.photo : '/assets/admin/imgs/no-image-author.png' }
                        alt={ user.name }
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:aspect-none"
                    />
                </div>
                {
                    showProfileOptions &&
                    <div className="origin-top-right absolute right-5 mt-5 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
                        <div className="py-2" role="none">
                            <button
                                className="w-full text-left text-gray-700 flex items-center gap-2 px-4 py-3 text-xl hover:bg-gray-100 hover:text-gray-900">
                                <i className='bx bxs-user text-3xl'></i>
                                <span>Perfil</span>
                            </button>
                            {
                                user.role === 'admin' &&
                                <NextLink href="/admin/usuarios" passHref>
                                    <a className="w-full text-left text-gray-700 flex items-center gap-2 px-4 py-3 text-xl hover:bg-gray-100 hover:text-gray-900">
                                        <i className='bx bx-shield-quarter text-3xl'></i>
                                        {/* <i class='bx bx-shield-quarter' ></i> */}
                                        <span>Usuarios</span>
                                    </a>
                                </NextLink>
                            }
                            <button
                                onClick={ logout } 
                                className="w-full text-left text-gray-700 flex items-center gap-2 px-4 py-3 text-xl hover:bg-gray-100 hover:text-gray-900">
                                <i className='bx bx-log-out text-3xl'></i>
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
