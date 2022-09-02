import { useState } from "react"



export const Profile = () => {


    const [showProfileOptions, setShowProfileOptions] = useState(false)


    return (
        <div className="flex justify-end items-center gap-4 bg-white py-5 px-5 shadow">
            <p className="font-bold text-slate-700">Contextos</p>
            <div>
                <div
                    onClick={() => setShowProfileOptions(!showProfileOptions)} 
                    className="w-14 relative cursor-pointer group">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Nombre de usuario"
                        className="w-full rounded-full bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-75 lg:aspect-none"
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
                            <button className="w-full text-left text-gray-700 flex items-center gap-2 px-4 py-3 text-xl hover:bg-gray-100 hover:text-gray-900">
                                <i className='bx bxs-user-account text-3xl'></i>
                                <span>Usuarios</span>
                            </button>
                            <button className="w-full text-left text-gray-700 flex items-center gap-2 px-4 py-3 text-xl hover:bg-gray-100 hover:text-gray-900">
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
