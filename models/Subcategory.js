import mongoose, { Schema } from 'mongoose'

export const subcategorySchema = new Schema({
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
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
})


const SubcategoryModel = mongoose.models.Subcategory || mongoose.model('Subcategory', subcategorySchema)

export default SubcategoryModel