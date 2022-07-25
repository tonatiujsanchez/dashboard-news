import mongoose, { Schema } from 'mongoose'


export const imageSchema = new Schema({
    name: {
        type: String,
    },
    url: {
        type: String
    },
    createdAt: {
        type: Number,
        require: true,
        default: Date.now,
    },
    size: {
        type: Number,
    }
})



const ImageModel = mongoose.models.Image || mongoose.model('Image', imageSchema)

export default ImageModel