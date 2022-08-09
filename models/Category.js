import mongoose, { Schema } from 'mongoose'


export const categorySchema = new Schema({
    title: {
        type: String,
    },
    slug: {
        type: String
    },
    tag: {
        type: String,
    },
    position: {
        type: Number,
        required: true,
    }
})



const CategoryModel = mongoose.models.Category || mongoose.model('Category', categorySchema)

export default CategoryModel