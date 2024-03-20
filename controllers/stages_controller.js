const stages = require('express').Router()
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')


stages.get('/', async (req, res) => {
    
})

module.exports = stages