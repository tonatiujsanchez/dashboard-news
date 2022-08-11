import mongoose from "mongoose"

import slugify from "slugify"

import { db } from "../../../database"
import { Category } from "../../../models"



export default async function handler(req, res) {


    const { id = '' } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: `${id} no es un id valido` })
    }


    switch (req.method) {
        case 'GET':
            return getCategory(req, res)

        case 'PUT':
            return updateCategory(req, res)
        // Remove
        case 'DELETE':
            return deleteCategory(req, res)

        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }
}

const getCategory = async (req, res) => {

    const { id } = req.query

    await db.connect()
    const category = await Category.findById(id)
    await db.disconnect()

    if (!category) {
        await db.disconnect()
        return res.status(400).json({ message: 'No hay ninguna categoria con ese ID' })
    }

    return res.status(200).json(category)

}


const updateCategory = async (req, res) => {

    const { id } = req.query

    await db.connect()
    const categoryToUpdate = await Category.findById(id)

    if (!categoryToUpdate) {
        await db.disconnect()
        return res.status(400).json({ message: 'No hay ninguna categoria con ese ID' })
    }

    const {
        title = categoryToUpdate.title,
        tag = categoryToUpdate.tag,
        position = categoryToUpdate.position,
        type = categoryToUpdate.type,
        category = categoryToUpdate.category,
    } = req.body

    if( title !== categoryToUpdate.title ){
        categoryToUpdate.slug = slugify(title, { replacement: '-', lower: true})
    }

    if(type === 'subcategory'){
        categoryToUpdate.category = null
    }else{
        categoryToUpdate.category = category
    }

    try {
        categoryToUpdate.title = title
        categoryToUpdate.tag = tag
        categoryToUpdate.position = position
        categoryToUpdate.type = type
        categoryToUpdate.save()
        
        await db.disconnect()
        return res.status(200).json(categoryToUpdate)

    } catch (error) {
        
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }
}


const deleteCategory = async(req, res) => {
    
    const { id } = req.query    

    await db.connect()
    const category = await Category.findById( id )

    if( !category ){
        await db.disconnect()
        res.status(400).json({ message: 'No hay ninguna categoria con es ID' })
    }

    try {

        await category.deleteOne()
        await db.disconnect()

        return res.status(200).json({ message: 'Categoria eliminada' })
    
    } catch (error) {

        await db.disconnect()
        console.log(error)
        return res.status(400).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }

}