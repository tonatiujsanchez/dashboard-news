import mongoose, { Schema } from 'mongoose'


export const imageSchema = new Schema({
    name: {
        type: String,
    },
    url: {
        type: String,
    },
    size: {
        type: Number,
    },
    format: {
        type: String,
    },
    section: {
        type: String,
        enum: {
            values: ['article', 'author', 'user'],
            message: '{VALUE} no es una sección válida',
            default: 'article',
            required: true
        },
    },
},{
    timestamps: true,
})



const ImageModel = mongoose.models.Image || mongoose.model('Image', imageSchema)

export default ImageModel