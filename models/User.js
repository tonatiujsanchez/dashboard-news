import mongoose, { Schema } from 'mongoose';


export const userSchema = new Schema({

    name    : { type: String, required: true },
    email   : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: {
            values: ['admin', 'editor'],
            message: '{VALUE} no es un role válido',
            default: 'admin',
            required: true
        }
    },
    photo: { type: String },
}, {
    timestamps: true,
})

const UserModel = mongoose.models.User || mongoose.model('User',userSchema);

export default UserModel;