// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../database"
import { initialData } from "../../database"
import { Category, Entry, Subcategory } from "../../models"



export default async function handler(req, res) {

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ messaje: 'No tiene acceso a este servicio' })
    }

    await db.connect()

    // Categories
    // await Category.deleteMany()
    // await Category.insertMany( initialData.categories )

    // Subcategories
    await Subcategory.deleteMany()
    await Subcategory.insertMany( initialData.subcategories )

    await db.disconnect()

    res.status(200).json({ message: 'Proceso realizado correctamente' })

}
