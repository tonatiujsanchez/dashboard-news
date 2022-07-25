import mongoose, { Schema } from 'mongoose'
import { categorySchema } from './Category'


export const municipioSchema = new Schema({
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
        type: categorySchema
    }
})


const MunicipioModel = mongoose.models.Municipio || mongoose.model('Municipio', municipioSchema)

export default MunicipioModel