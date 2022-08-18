import slugify from "slugify"

import { db } from "../../../../database"
import { Category } from "../../../../models"




export default async function handler(req, res) {

    switch (req.method) {

        case 'GET':
            return getCategories(res)

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
