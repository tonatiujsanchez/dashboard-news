import mongoose, { Schema } from 'mongoose'
import CategoryModel, { categorySchema } from './Category'


const entrySchema = new Schema({
    user: { 
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: false,
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
    published: {
        type: Boolean,
        require: true,
        default: false,
    },
    image: {
        type: String,
        require: false,
    },
    imageSocial: {
        type: String,
        require: false,
    },
    inFrontPage: {
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
    subcategory: {
        type: categorySchema,
        require: false,
    },
    autor: {
        type: String,
        require: false,
    },
    views: {
        type: Number,
        require: true,
        default: 0,
    }
},{
    timestamps: true
})

const EntryModel = mongoose.models.Entry || mongoose.model('Entry', entrySchema)

export default EntryModel