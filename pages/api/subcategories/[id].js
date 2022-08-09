import mongoose from "mongoose"

import slugify from "slugify"

import { db } from "../../../database"
import { Subcategory } from "../../../models"


export default async function handler(req, res) {

    const { id } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: `${id} no es un id valido` })
    }

    switch (req.method) {
        case 'GET':
            return getSubcategory(req, res)

        case 'PUT':
            return updateSubcategory(req, res)

        case 'DELETE':
            return removeSubcategory(req, res)

        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }
}


const getSubcategory = async(req, res) => {

    const { id } = req.query

    await db.connect()
    const subcategory = await Subcategory.findById(id)
    await db.disconnect()

    if (!subcategory) {
        return res.status(400).json({ message: 'No hay ninguna subcategoria con ese ID' })
    }

    return res.status(200).json(subcategory)
}

const updateSubcategory = async(req, res) => {

    const { id } = req.query

    await db.connect()
    const subcategoryToUpdate = await Subcategory.findById(id)

    if (!subcategoryToUpdate) {
        return res.status(400).json({ message: 'No hay ninguna subcategoria con ese ID' })
    }

    const {
        title = subcategoryToUpdate.title,
        tag = subcategoryToUpdate.tag,
        position = subcategoryToUpdate.position,
        category = subcategoryToUpdate.category
    } = req.body

    if (title !== subcategoryToUpdate.title) {
        subcategoryToUpdate.slug = slugify(title, { replacement: '-', lower: true })
    }

    try {
        subcategoryToUpdate.title = title
        subcategoryToUpdate.tag = tag
        subcategoryToUpdate.position = position
        subcategoryToUpdate.category = category
        subcategoryToUpdate.save()

        await db.disconnect()
        res.status(200).json(subcategoryToUpdate)

    } catch (error) {

        await db.disconnect()
        console.log(error)
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }
}


const removeSubcategory = async(req, res) => {

    const { id } = req.query

    await db.connect()
    const subcategory = await Subcategory.findById(id)

    if (!subcategory) {
        await db.disconnect()
        res.status(400).json({ message: 'No hay ninguna categoria con es ID' })
    }

    try {

        await subcategory.deleteOne()
        await db.disconnect()

        return res.status(200).json({ message: 'Subcategoria eliminada' })

    } catch (error) {

        await db.disconnect()
        console.log(error)
        return res.status(400).json({ message: 'Algo salio mal, revisar la consola del servidor' })
    }

}