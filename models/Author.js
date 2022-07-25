import mongoose, { Schema } from 'mongoose'
import { imageSchema } from './Image'


export const authorSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: Email,
    },
    web: {
        type: String,
    },
    photo: {
        type: imageSchema,
    },
    description: {
        type: String,
    }
})

const AuthorModel = mongoose.models.Author || mongoose.model('Author', authorSchema)

export default AuthorModel