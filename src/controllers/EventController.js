const Event = require('../models/Event')
const User = require('../models/User')

module.exports = {
    async createEvent(req, res) {
        const { title, description, price, category, date } = req.body
        const { user_id } = req.headers
        const { filename } = req.file

        const user = await User.findById(user_id)

        if (!user) {
            return res.status(400).json({ message: "User does not exist!" })
        }

        const event = await Event.create({
            title,
            description,
            price: parseFloat(price),
            user: user_id,
            category,
            thumbnail: filename,
            date
        })

        return res.json(event)
    },

    async delete(req, res) {
        const { eventId } = req.params
        try {
            await Event.findByIdAndDelete(eventId)
            return res.status(204)
        } catch (error) {
            return res.status(400).json({ message: "Event IDs does not exist!" })
        }
    }
}