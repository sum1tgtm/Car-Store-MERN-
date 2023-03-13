const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true
        },  
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        rentable: {
            type: Boolean,
            default: false,
        },
        carInfo: {
            brand: {
                type: String,
                required: true
            },
            model: {
                type: String,
                required: true
            },
            year: {
                type: Number,
                required: true
            },
            mileage: {
                type: Number,
                required: true
            },
            transmission: {
                type: String,
                required: true
            },
            fuelType: {
                type: String,
                required: true
            }
        },
        image: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model("Post", PostSchema)