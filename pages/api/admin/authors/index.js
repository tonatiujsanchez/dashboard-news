import slugify from "slugify"

import { db } from "../../../../database"
import { Author } from "../../../../models"



export default async function handler(req, res) {

    switch (req.method) {

        case 'POST':
            return postAuthor(req, res)

        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }

}



const postAuthor = async (req, res) => {
    const {
        name = '',
        facebook = '',
        twitter = '',
        instagram = '',
        email = '',
        phone = '',
        web = '',
        occupation = '',
        description = '',
        photo = '',
    } = req.body

    if([name.trim()].includes('')){
        return res.status(400).json({ message: 'La propiedad name es requeridas' })
    }

    const slug = slugify(name, { replacement: '-', lower: true })

    const newAuthor = new Author({
        name: name.trim(),
        slug,
        facebook: facebook.trim(),
        twitter: twitter.trim(),
        instagram: instagram.trim(),
        email: email.trim(),
        phone: phone.trim(),
        web: web.trim(),
        occupation: occupation.trim(),
        description: description.trim(),
        photo: photo.trim(),
    })

    try {
        await db.connect()
        await newAuthor.save()
        await db.disconnect()
        
        return res.status(201).json(newAuthor)

    } catch (error) {

        await db.disconnect()
        console.log(error)
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })

    }


}