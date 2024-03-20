// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')
require('dotenv').config()

// CONFIGURATION / MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// CONTROLLERS
const bandsController = require('./controllers/bands_controller')
app.use('/bands', bandsController)


// // DATABASE
// const sequelize = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
// const testSequelize = async () => {
//     try {
//         await sequelize.authenticate()
//         console.log('Connection successful.')
//     } catch (error) {
//         console.error('Unable to connect', error)
//     }
// }

// LISTEN
app.listen(process.env.DB_PORT, () => {
    // testSequelize()
    console.log(`🎸 Rockin' on port: ${process.env.DB_PORT}`)
})