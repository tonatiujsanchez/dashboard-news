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
    },
    type: {
        type: String,
        enum: {
            values: ['category', 'subcategory'],
            message: '{VALUE} no es un tipo válido',
            required: true
        },
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        default: null
    }
},{
    timestamps: true,
})



const CategoryModel = mongoose.models.Category || mongoose.model('Category', categorySchema)

export default CategoryModel