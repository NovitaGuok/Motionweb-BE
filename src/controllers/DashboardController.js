const Event = require('../models/Event')

module.exports = {
    async getEventById(req, res) {
        const { eventId } = req.params
        try {
            const event = await Event.findById(eventId)

            if (event) {
                return res.json(event)
            }
        } catch (error) {
            return res.status(400).json({ message: "Event IDs does not exist!" })
        }
    },

    async getAllEvents(req, res) {
        const { category } = req.params;
        const query = category ? { category } : {}

        try {
            const events = await Event.find(query)
            if (events) {
                return res.json(events)
            }
        } catch (error) {
            return res.status(400).json({ message: "We don't have any events yet!" })
        }
    },

    async getEventsByUserId(req, res) {
        const { user_id } = req.headers

        try {
            const events = await Event.find({ user: user_id })
            if (events) {
                return res.json(events)
            }
        } catch (error) {
            return res.status(400).json({ message: `We don't have any events with user ${user_id}!` })
        }
    },
}