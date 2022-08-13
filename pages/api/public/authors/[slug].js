



import { db } from "../../../../database"
import { Author } from "../../../../models"


export default async function handler(req, res) {


    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res)

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const getProductBySlug = async (req, res) => {

    const { slug = '' } = req.query

    await db.connect()
    const author = await Author.findOne({slug}).lean()
    await db.disconnect()

    if( !author ){
        return res.status(400).json({ message: 'Autor no encontrado' })
    }

    return res.status(200).json(author)
}