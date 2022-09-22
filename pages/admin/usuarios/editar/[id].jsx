import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

import { TitlePage } from "../../../../components/admin/ui"
import { UserForm } from "../../../../components/admin/users"
import { AdminLayout } from "../../../../components/layouts"

import { useData } from "../../../../hooks/useData"



const EditarUsuario = () => {

    const router = useRouter()
    const [user, setUser] = useState({})

    const { users } = useData()

    useEffect(()=>{
       const user = users.find( user => user._id === router.query.id )
        if(user){
            setUser({...user}) 
        }else {
            router.back()
        }
    },[router, users])

    if(!user._id){
        return <></>
    }

    return (
        <AdminLayout title="- Editar usuario" >
            <div className="mb-5 flex gap-2 items-center py-3">
                <TitlePage title={`Editar a: ${ user.name }`} />
            </div>
            <UserForm userEdit={user} />
        </AdminLayout>
    )
}

export default EditarUsuario