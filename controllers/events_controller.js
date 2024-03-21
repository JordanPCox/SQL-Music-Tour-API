const events = require('express').Router()
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')


events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ ['available_start_time', 'ASC'] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

events.get('/:id', async (req, res) => {
    try {
        const specificEvent = await Event.findOne({
            where: { id: req.params.id }
        })
        res.json(specificEvent)
    } catch (e) {
        res.send(e.message)
    }
})

events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.json(newEvent)
    } catch (e) {
        res.send(e.message)
    }
})

events.put('/:id', async (req, res) => {
    try {
        const { name, genre } = req.body
        if (!name && !genre) {
            throw Error ('No fields to update')
        }
        const [ numUpdated ] = await Event.update(req.body, {
            where: { id: req.params.id }
        })
        res.send(`Updated ${numUpdated} events.`)
    } catch (e) {
        res.send(e.message)
    }
})

events.delete('/:id', async (req, res) => {
    try {
        const deleted = await Event.destroy({
        where: { id: req.params.id }
    })
    res.send(`Deleted ${deleted} events.`)
    } catch (e) {
        res.send(e.message)
    }
})

module.exports = events