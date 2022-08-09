import slugify from "slugify"

import { db } from "../../../database"
import { Subcategory } from "../../../models"




export default async function handler(req, res) {


    switch (req.method) {

        case 'GET':
            return getSubcategories(res)

        case 'POST':
            return postSubcategory(req, res)

        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }

}

const getSubcategories = async (res) => {

    await db.connect()
    const subcategories = await Subcategory.find().sort({ position: 'ascending' })
    await db.disconnect()

    return res.status(200).json(subcategories)
}


const postSubcategory = async (req, res) => {

    const { title = '', tag = '', position = null, category = null } = req.body

    if ([title.trim(), tag.trim()].includes('')) {
        return res.status(400).json({ message: 'La propiedades title y tag son requeridas' })
    }

    if (!position) {
        return res.status(400).json({ message: 'La propiedad position es requerida' })
    }
    if (!category) {
        return res.status(400).json({ message: 'La propiedad position es requerida' })
    }

    // Create slug
    const slug = slugify(title, { replacement: '-', lower: true })

    const newSubcategory = new Subcategory({
        title: title.trim(),
        tag: tag.trim(),
        position,
        slug,
        category
    })

    try {

        await db.connect()
        await newSubcategory.save()
        await db.disconnect()

        return res.status(201).json(newSubcategory)
    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }

}