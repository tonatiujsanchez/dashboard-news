import { isValidObjectId } from "mongoose"
import { db } from "../../../../database"
import { User } from "../../../../models"

export default function handler(req, res) {

    const { id = '' } = req.query

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: `${id} no es un id valido` })
    }

    switch (req.method) {

        case 'PUT':
            return updateUser(req, res)

        case 'DELETE':
            return deleteUser(req, res)

        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }



}

const updateUser = async (req, res) => {

    const { id } = req.query

    await db.connect()
    const userUpdate = await User.findById(id).select('-password')

    if( !userUpdate ){
        await db.disconnect()
        return res.status.json({ message: 'Usuario no encontrado' })
    }

    const { 
        role  = userUpdate.role, 
        name  = userUpdate.name, 
        email = userUpdate.email 
    } = req.body

    try {
        userUpdate.role = role
        userUpdate.name = name
        userUpdate.email = email
        await userUpdate.save()

        return res.status(200).json(userUpdate)
        
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }

}

const deleteUser = async (req, res) => {
    const { id } = req.query

    await db.connect()
    const user = await User.findById(id)

    if( !user ){
        return res.status(400).json({ message: 'No hay ningun usuario con ese ID' })
    }

    try {
        
        await user.deleteOne()
        await db.disconnect()

        res.status(200).json({ message: 'Usuario eliminado correctamente' })
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }
}