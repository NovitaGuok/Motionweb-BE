const express = require('express');
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const RegistrationController = require('./controllers/RegistrationController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')
const uploadConfig = require('./config/upload')

const routes = express.Router();
const upload = multer(uploadConfig)

routes.get('/status', (req, res) => {
    res.send({ status: 200 })
})

// Registration
routes.post('/registration/:eventId', RegistrationController.create)
routes.get('/registration/:registration_id', RegistrationController.getRegistration)
routes.post('/registration/:registration_id/approvals', ApprovalController.approval)
routes.post('/registration/:registration_id/rejections', RejectionController.rejection)

// Login
routes.post('/login', LoginController.store)

// Dashboard
routes.get('/dashboard/:category', DashboardController.getAllEvents)
routes.get('/dashboard', DashboardController.getAllEvents)
routes.get('/user/events', DashboardController.getEventsByUserId)
routes.get('/event/:eventId', DashboardController.getEventById)

// Event
routes.post('/event', upload.single('thumbnail'), EventController.createEvent)
routes.delete('/event/:eventId', EventController.delete)

// User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

module.exports = routes