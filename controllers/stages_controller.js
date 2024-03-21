const stages = require('express').Router()
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')


stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            order: [ ['available_start_time', 'ASC'] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

stages.get('/:id', async (req, res) => {
    try {
        const specificStage = await Stage.findOne({
            where: { id: req.params.id }
        })
        res.json(specificStage)
    } catch (e) {
        res.send(e.message)
    }
})

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.json(newStage)
    } catch (e) {
        res.send(e.message)
    }
})

stages.put('/:id', async (req, res) => {
    try {
        const { name, genre } = req.body
        if (!name && !genre) {
            throw Error ('No fields to update')
        }
        const [ numUpdated ] = await Stage.update(req.body, {
            where: { id: req.params.id }
        })
        res.send(`Updated ${numUpdated} stages.`)
    } catch (e) {
        res.send(e.message)
    }
})

stages.delete('/:id', async (req, res) => {
    try {
        const deleted = await Stage.destroy({
        where: { id: req.params.id }
    })
    res.send(`Deleted ${deleted} stages.`)
    } catch (e) {
        res.send(e.message)
    }
})

module.exports = stages