import mongoose from "mongoose"

import slugify from "slugify"

import { db } from "../../../../database"
import { Category } from "../../../../models"



export default async function handler(req, res) {


    const { id = '' } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: `${id} no es un id valido` })
    }


    switch (req.method) {
        case 'GET':
            return getCategory(req, res)

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

