import { Image } from '../../../../models'
import { db, NEWS_CONSTANTS } from '../../../../database'


import formidable from 'formidable'

import { v2 as cloudinary } from 'cloudinary'
cloudinary.config( process.env.CLOUDINARY_URL || '')


export const config = {
    api: {
        bodyParser: false
    }
}

export default function handler(req, res) {
    
    switch (req.method) {
        case 'POST':
            
            return uploadFile( req, res )
    
        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }
}


const saveFile = async(file, section, user) => {

    const { public_id, secure_url, bytes, format } = await cloudinary.uploader.upload( file.filepath )

    return {
        name: public_id,
        url : secure_url,
        size: bytes,
        format,
        section,
        user
    }
}

const parseFiles = async (req) => {

    return new Promise((  resolve, reject )=> {

        const form = new formidable.IncomingForm()
        form.parse(req, async( err, fields, files )=>{

            if(!NEWS_CONSTANTS.validImagesSections.includes(fields.section)){
                return reject('Sección NO valida')
            }

            if(!fields.user){
                return reject('Es necesario un usuario para subir una imagen')
            }

            if( err ){
                return reject(err)
            }

            const image = await saveFile( files.file, fields.section, fields.user )
            resolve(image)
        })

    })
}

const uploadFile = async ( req, res ) => {


    try {
        const image = await parseFiles( req )
        
        const newImage = new Image(image)
        
        await db.connect()
        await newImage.save()
        await db.disconnect()
        
        return res.status(200).json(newImage)
    } catch (error) {

        await db.disconnect()
        console.log(error)
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }

}