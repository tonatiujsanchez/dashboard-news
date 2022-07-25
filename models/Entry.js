import mongoose, { Schema } from 'mongoose'
import { authorSchema } from './Author'
import { categorySchema } from './Category'
import { imageSchema } from './Image'
import { municipioSchema } from './Municipio'


const entrySchema = new Schema({
    user: { 
        type: mongoose.Types.ObjectId,
        require: true,
    },
    title: { 
        type: String, 
        require: true,
    },
    description: { 
        type: String, 
    },
    content: { 
        type: String, 
        require: true,
    },
    createdAd: {
        type: Number,
        require: true,
    },
    updatedAt: {
        type: Number,
        require: true,
    },
    published: {
        type: Boolean,
        require: true,
        default: false,
    },
    image: {
        type: imageSchema,
        require: false,
    },
    imageSocial: {
        type: imageSchema,
        require: false,
    },
    destacado: {
        type: Boolean,
        require: true,
        default: true,
    },
    slug: {
        type: String,
        require: true,
    },
    category: {
        type: categorySchema,
        require: true,
    },
    autor: {
        type: authorSchema,
        require: false,
    },
    municipio: {
        type: municipioSchema,
        require: false,
    },
    views: {
        type: Number,
        require: true,
        default: 0,
    }
})

const EntryModel = mongoose.models.Entry || mongoose.model('Entry', entrySchema)

export default EntryModel