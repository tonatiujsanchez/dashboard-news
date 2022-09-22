import { db } from "../../../../database";
import { jwt } from "../../../../utils/shared";
import { User } from "../../../../models";


export default function handler(req, res) {

    switch (req.method) {
        case 'GET':

            return checkJWT(req, res);

        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }
}


const checkJWT = async (req, res) => {

    const { news_session_UD3EZGXun367 = '' } = req.cookies

    let userId = ''

    try {

        userId = await jwt.isValidToken( news_session_UD3EZGXun367 )

    } catch (error) {
        return res.status(401).json({
            message: 'Token de autorización no valido'
        })
    }

    await db.connect()
    const user = await User.findById(userId).lean()
    await db.disconnect()

    if (!user) {
        return res.status(400).json({ message: 'No existe ningun usuario con ese id' })
    }

    const { _id, email, name, role, photo } = user

    return res.status(200).json({
        token: jwt.signToken( _id, email, role ),
        user: {
            _id,
            email,
            name,
            role,
            photo
        }
    })

}