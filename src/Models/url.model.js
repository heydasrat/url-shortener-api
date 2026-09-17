import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },
        shortCode: {
            type: String,
            required: true
        },
        accessCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    })
const URL = mongoose.model("URL", urlSchema)
export default URL