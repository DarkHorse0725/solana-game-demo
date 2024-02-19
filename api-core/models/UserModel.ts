import { default as mongoose, Schema } from 'mongoose'

const UserSchema = new Schema({
    wallet: {
        required: true,
        type: String
    },
    vault_secretkey: {
        required: true,
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    credit: {
        default: 0,
        type: Number
    },
    creditBonk: {
        default: 0,
        type: Number
    },
})

export default mongoose.models.User || mongoose.model("User", UserSchema)