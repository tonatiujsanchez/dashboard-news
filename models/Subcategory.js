import mongoose, { Schema } from 'mongoose'

export const subcategorySchema = new Schema({
    title: {
        type: String,
    },
    slug: {
        type: String
    },
    tag: {
        type: Number,
        require: true,
        default: Date.now,
    },
    posicion: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
    }
})


const SubcategoryModel = mongoose.models.Subcategory || mongoose.model('Subcategory', subcategorySchema)

export default SubcategoryModel