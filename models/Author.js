import mongoose, { Schema } from 'mongoose'



export const authorSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    facebook: {
        type: String,
    },
    twitter: {
        type: String,
    },
    instagram: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    web: {
        type: String,
    },
    occupation: {
        type: String,
    },
    description: {
        type: String,
    },
    photo: {
        type: String,
    }
},{
    timestamps: true,
})

const AuthorModel = mongoose.models.Author || mongoose.model('Author', authorSchema)

export default AuthorModel