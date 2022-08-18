import mongoose from "mongoose"

import slugify from "slugify"

import { db } from "../../../../database"
import { Author } from "../../../../models"

export default async function handler(req, res) {

    const { slug = '' } = req.query

    if (slug.trim() === '') {
        return res.status(400).json({ message: `La propiedad slug es requerida` })
    }

    switch (req.method) {

        case 'PUT':
            return updateAuthor(req, res)

        case 'DELETE':
            return deleteAuthor(req, res)

        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }

}

const updateAuthor = async (req, res) => {
    const { slug } = req.query

    db.connect()
    const authorToUpdate = await Author.findOne({ slug })

    if (!authorToUpdate) {
        res.status(400).json({ message: `No se encontro ningun autor con el slug: ${slug}` })
    }

    const {
        name = authorToUpdate.name,
        facebook = authorToUpdate.facebook,
        twitter = authorToUpdate.twitter,
        instagram = authorToUpdate.instagram,
        email = authorToUpdate.email,
        phone = authorToUpdate.phone,
        web = authorToUpdate.web,
        occupation = authorToUpdate.occupation,
        description = authorToUpdate.description,
        photo = authorToUpdate.photo,
    } = req.body


    if (name !== authorToUpdate.name) {
        authorToUpdate.slug = slugify(name, { replacement: '-', lower: true })
    }

    try {

        authorToUpdate.name = name
        authorToUpdate.facebook = facebook
        authorToUpdate.twitter = twitter
        authorToUpdate.instagram = instagram
        authorToUpdate.email = email
        authorToUpdate.phone = phone
        authorToUpdate.web = web
        authorToUpdate.occupation = occupation
        authorToUpdate.description = description
        authorToUpdate.photo = photo
        authorToUpdate.save()

        db.disconnect()
        return res.status(200).json(authorToUpdate)

    } catch (error) {
        db.disconnect()
        console.log(error)
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }

}

const deleteAuthor = async (req, res) => {
    
    const { slug } = req.query

    await db.connect()
    const author = await Author.findOne({slug})

    if( !author ){
        await db.disconnect()
        res.status(400).json({ message: `No se encontro ningun autor con el slug: ${slug}` })
    }

    try {
        await author.deleteOne()
        await db.disconnect()

        return res.status(200).json({ message: 'Autor eliminado' })

    } catch (error) {
        await db.disconnect()
        console.log( error )
        return res.status(400).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }

}