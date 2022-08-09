import slugify from "slugify"

import { db } from "../../../database"
import { Category } from "../../../models"




export default async function handler(req, res) {

    switch (req.method) {

        case 'GET':
            return getCategories(res)

        case 'POST':
            return postCategory(req, res)

        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }

}


const getCategories = async (res) => {
    await db.connect()
    const categories = await Category.find().sort({ position: 'ascending' })
    await db.disconnect()


    return res.status(200).json(categories)
}


const postCategory = async (req, res) => {

    const { title = '', tag = '', position = null } = req.body

    if ([title.trim(), tag.trim()].includes('')) {
        return res.status(400).json({ message: 'La propiedades title y tag son requeridas' })
    }

    if (!position) {
        return res.status(400).json({ message: 'La propiedad position es requerida' })
    }

    // Create slug
    const slug = slugify(title, { replacement: '-', lower: true})


    const newCategory = new Category({
        title: title.trim(),
        tag: tag.trim(),
        position,
        slug
    })

    try {
        await db.connect()
        await newCategory.save()
        await db.disconnect()

        return res.status(201).json(newCategory)

    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }


}