import mongoose, { Schema } from 'mongoose'



export const authorSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
    },
    web: {
        type: String,
    },
    photo: {
        type: String,
    },
    description: {
        type: String,
    }
})

const AuthorModel = mongoose.models.Author || mongoose.model('Author', authorSchema)

export default AuthorModel