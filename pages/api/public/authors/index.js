
import { db } from "../../../../database"
import { Author } from "../../../../models"


export default async function handler(req, res) {

    switch (req.method) {

        case 'GET':
            return getAuthors(res)

        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }

}


const getAuthors = async (res) => {
    await db.connect()
    const authors = await Author.find().sort({ createdAt: 'ascending' })
    await db.disconnect()

    return res.status(200).json({
        length: authors.length,
        authors
    })
}