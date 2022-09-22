import { isValidObjectId } from 'mongoose'
import bcryptjs from 'bcryptjs'

import { db } from "../../../../../database"
import { User } from "../../../../../models"

export default function handler(req, res) {

    const { id = '' } = req.query

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: `${id} no es un id valido` })
    }
    
    switch (req.method) {

        case 'PUT':
            return changePassword( req, res )
    
        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }
}

const changePassword = async ( req, res ) => {
    
    const { password='' } = req.body

    if ([password].includes('')) {
        return res.status(400).json({ message: 'La contraseña es requerida' })
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña es muy corta, debe tener minimo 6 carateres' })
    }

    const { id } = req.query

    await db.connect()
    const userUpdate = await User.findById(id)

    if( !userUpdate ){
        await db.disconnect()
        return res.status(400).json({ message: 'Usuario no encontrado' })
    }

    userUpdate.password = bcryptjs.hashSync( password )

    await userUpdate.save()
    await db.connect()

    return res.status(200).json({ message: 'Contraseña actualizada' })
}