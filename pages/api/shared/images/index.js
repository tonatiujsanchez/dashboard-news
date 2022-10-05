import mongoose from 'mongoose'
import * as jose from 'jose'

import { NEWS_CONSTANTS, db } from "../../../../database"
import { Image } from "../../../../models"


import { v2 as cloudinary } from 'cloudinary'
cloudinary.config( process.env.CLOUDINARY_URL || '')


export default function handler(req, res) {
    
    switch (req.method) {
        
        case 'GET':
            return getImages( req, res )
    
        case 'DELETE':
            return deleteImage( req, res )
    
        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }

}


const getImages = async ( req, res ) => {

    
    const { section = '' } = req.query
    
    if( !section ){
        return res.status(400).json({ message: 'La porpiedad section es necesaria' })
    }
    
    
    if( !NEWS_CONSTANTS.validImagesSections.includes(section) ){
        return res.status(400).json({ message: 'Sección de la imagen NO valida' })
    }

    try {
        await db.connect()
        const images = await Image.find({ section })
                                  .select('name url size format section')
                                  .sort({ createdAt: 'descending' })
                                  .lean()
        await db.disconnect()

        return res.status(200).json(images)

    } catch (error) {

        await db.disconnect()
        console.log(error)
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })
        
    }

}


const deleteImage = async( req, res ) => {

    const { imageId = '' } = req.body

    if(!imageId){
        return res.status(400).json({ message: 'Se requiere el ID de la imagen' })
    }
    
    if (!mongoose.isValidObjectId(imageId)) {
        return res.status(400).json({ message: `${imageId} no es un id valido` })
    }


    await db.connect()
    const image = await Image.findById(imageId)
    
    if( !image ){
        await db.disconnect()
        return res.status(400).json({ message: 'Imagen no encontrada' })
    }


    const { news_session_UD3EZGXun367:token } = req.cookies

    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED))

    
    if( image.user !== payload._id && payload.role !== 'admin' ){
        await db.disconnect()
        return res.status(400).json({ message: 'No tiene permisos para eliminar esta imagen' })
    }

    
    try {
        await cloudinary.uploader.destroy(image.name)
        await image.deleteOne()
        
        await db.disconnect()
        return res.status(200).json({ message: 'Imagen eliminada' })
        
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }
}