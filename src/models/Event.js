const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    category: String,
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    toJSON: {
        virtuals: true
    }
})

EventSchema.virtual("thumbnail_url").get(function () { return `http://localhost:7000/files/${this.thumbnail}` })

module.exports = mongoose.model('Event', EventSchema)