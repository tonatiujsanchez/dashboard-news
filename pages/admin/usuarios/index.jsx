

import { AdminLayout } from "../../../components/layouts"
import { BtnSuccess, LoadingAdmin, TitlePage } from "../../../components/admin/ui"
import { useData } from "../../../hooks/useData"
import { useEffect, useState } from "react"
import styled from "@emotion/styled"


const UsuariosPage = () => {

    const [loading, setLoading] = useState(false)

    const { refreshUsers, users } = useData()

    const loadUsers = async () => {
        setLoading(true)
        await refreshUsers()
        setLoading(false)
    }

    useEffect(() => {
        if (users.length <= 0) {
            loadUsers()
        }
    }, [])

    return (
        <AdminLayout title="- Usuarios" >
            <div className="mb-5 flex gap-2 items-center py-3">
                <TitlePage title="Usuarios" />
                <button
                    className="text-3xl text-slate-600 hover:bg-slate-200 hover:text-slate-900 py-2 px-3 rounded-full active:scale-95"
                    onClick={() => loadUsers()}>
                    <i className='bx bx-revision'></i>
                </button>
            </div>

            {
                loading
                    ? <div className="flex justify-center mt-96">
                        <LoadingAdmin />
                    </div>
                    : <section>
                        <div className="w-full mb-5">
                            <BtnSuccess onClick={()=>{}} text="Agregar nuevo usuario" />
                        </div>
                        <div className=" flex flex-col gap-5 items-center max-w-[600px] mx-auto">
                            {
                                users.map(user => (
                                    <div key={user._id} className="flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-20 sm:items-center shadow p-5 sm:p-10 bg-white rounded-lg w-full">
                                        <div className="flex flex-wrap gap-5 items-center">
                                            <div className="relative">
                                                <div className="w-24 h-24 rounded-full overflow-hidden relative cursor-pointer group border">
                                                    <img
                                                        src={user.photo ? user.photo : '/assets/admin/imgs/no-image-author.png'}
                                                        alt={user.name}
                                                        title={user.name}
                                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:aspect-none"
                                                    />
                                                </div>
                                                <RoleTag className={`text-lg px-2 rounded-md ${user.role === 'admin' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200'}`}>
                                                    {user.role === 'admin' ? 'Administrador' : 'Editor'}
                                                </RoleTag>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold">{user.name}</p>
                                                <p className="text-slate-600 text-2xl w-auto">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-5 self-end sm:self-center">
                                            <button
                                                className='flex items-center text-sky-600 hover:text-white bg-sky-100 hover:bg-sky-500 font-bold text-3xl py-2 px-3 rounded-md'
                                                onClick={() => { }}>
                                                <i className='bx bx-edit'></i>
                                            </button>
                                            <button
                                                className='flex items-center text-red-600 hover:text-white bg-red-100 hover:bg-red-500 font-bold text-3xl py-2 px-3 rounded-md'
                                                onClick={() => { }}>
                                                <i className='bx bx-trash' ></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>
            }


        </AdminLayout>
    )
}

const RoleTag = styled.span`
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
`


export default UsuariosPage