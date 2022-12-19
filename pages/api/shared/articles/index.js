
import slugify from "slugify"
import * as jose from 'jose'

import { Entry } from "../../../../models"



export default function handler(req, res) {

    switch (req.method) {

        case 'POST':
            return postEntry( req, res )

        case 'GET':
            return gatEntries( req, res )


        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }

}


const postEntry = async(req, res) => {

    // TODO:
    const { 
        title = '',
        content = '',
        description = '',
        published = true,
        publishedAt = null,
        image= '',
        imageSocial = '',
        inFrontPage = true,
        slug = '',
        category = null,
        subcategory = null,
        author = null,
    } = req.body

    if( title.trim() === 'El titulo es necesario' ){
        return res.status(400).json({ message: 'El título es requerido' })
    }

    if( content.trim() === '' && published ){
        return res.status(400).json('No se puede publicar un artículo sin contenido')
    }

    if(!category){
        return res.status(400).json('La categoría es requerida')
    }
    
    if(!author){
        return res.status(400).json('El autor es requerido')
    }

    


    let publishedAtEntry;
    if( !publishedAt ) {
        publishedAtEntry = new Date()
    } else {
        publishedAtEntry = publishedAt
    }

    // TODO: Verificar la existencia del slug
    let slugEntry;
    if( slug.trim() === '' ) {
        slugEntry = slugify(title, { replacement: '-', lower: true })
    } else {
        slugEntry =  slug
    }

    try {
        const { 'news_session_UD3EZGXun367':token } = req.cookies
        const { payload } = await jose.jwtVerify(String( token ), new TextEncoder().encode(process.env.JWT_SECRET_SEED))
    
    
        const newEntry = await new Entry({
            user: payload._id,
            title,
            content,
            description,
            published,
            publishedAt: publishedAtEntry,
            image,
            imageSocial,
            inFrontPage,
            slug: slugEntry,
            category,
            subcategory,
            author,
        })

        await newEntry.save()

        return res.status(200).json( newEntry )
        
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }


}



const gatEntries = async(req, res) => {

    return res.status(200).json({ message: 'Hola mundo! desde -gatEntries()-' })
}



