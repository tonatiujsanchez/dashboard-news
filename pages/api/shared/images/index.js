import { NEWS_CONSTANTS, db } from "../../../../database"
import { Image } from "../../../../models"


export default function handler(req, res) {
    
    switch (req.method) {
        
        case 'GET':
            return getImages( req, res )
    
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
                                  .sort({ createdAt: 'ascending' })
                                  .lean()
        await db.disconnect()

        return res.status(200).json(images)

    } catch (error) {

        await db.disconnect()
        console.log(error)
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })
        
    }

    

        return res.status(200).json({ message: 'Holas desde images...' })

}