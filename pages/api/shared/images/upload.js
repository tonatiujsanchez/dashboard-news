import { Image } from '../../../../models'


import formidable from 'formidable'
import { v2 as cloudinary } from 'cloudinary'
import { db } from '../../../../database'
// import fs from 'fs'


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


const saveFile = async(file, section) => {

    const { public_id, secure_url, bytes, format } = await cloudinary.uploader.upload( file.filepath )

    return {
        name: public_id,
        url : secure_url,
        size: bytes,
        format,
        section
    }
}

const parseFiles = async (req) => {

    return new Promise((  resolve, reject )=> {

        const form = new formidable.IncomingForm()
        form.parse(req, async( err, fields, files )=>{

            const validSections = ['articles', 'authors', 'users']
            if(!validSections.includes(fields.section)){
                return reject('Sección NO valida')
            }

            if( err ){
                return reject(err)
            }

            const image = await saveFile( files.file, fields.section )
            resolve(image)
        })

    })
}

const uploadFile = async ( req, res ) => {


    try {
        const image = await parseFiles( req )
        // image.section = section
        
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