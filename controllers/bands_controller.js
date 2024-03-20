const bands = require('express').Router()
const db = require('../models')
const { Band } = db
const { Op } = require('sequelize')

// FIND ALL BANDS
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ ['available_start_time', 'ASC'] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

bands.get('/:id', async (req, res) => {
    try {
        const specificBand = await Band.findOne({
            where: { id: req.params.id }
        })
        res.json(specificBand)
    } catch (e) {
        res.send(e.message)
    }
})

bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.json(newBand)
    } catch (e) {
        res.send(e.message)
    }
})

bands.put('/:id', async (req, res) => {
    try {
        const { name, genre } = req.body
        if (!name && !genre) {
            throw Error ('No fields to update')
        }
        const [ numUpdated ] = await Band.update(req.body, {
            where: { id: req.params.id }
        })
        res.send(`Updated ${numUpdated} bands.`)
    } catch (e) {
        res.send(e.message)
    }
})

bands.delete('/:id', async (req, res) => {
    try {
        const deleted = await Band.destroy({
        where: { id: req.params.id }
    })
    res.send(`Deleted ${deleted} bands.`)
    } catch (e) {
        res.send(e.message)
    }
})


module.exports = bands