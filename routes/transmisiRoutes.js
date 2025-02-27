var express = require('express')
var router = express.Router()
const transmisiModel = require('../model/transmisiModel')

router.get('/', async (req, res, next) => {
    try {
        let rows = await transmisiModel.getAll()
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ messages: error.messages})
    }
})

router.post('/store', async (req, res, next) => {
    let { nama_transmisi } = req.body
    let data = { nama_transmisi }
    try {
        await transmisiModel.Store(data)
        res.status(200).json({messages: 'ok'})
    } catch (error) {
        res.status(500).json({messages: error.messages})
    }
})

router.patch('/update/:id', async (req, res, next) => {
    let id = req.params.id
    let { nama_transmisi } = req.body
    let data = { nama_transmisi }

    try {
        await transmisiModel.update(id, data)
        res.status(200).json({ messages: 'ok'})
    } catch (error) {
        res.status(500).json({messages: error.messages})
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    let id = req.params.id

    try {
        await transmisiModel.delete(id)
        res.status(200).json({ messages: 'ok'})
    } catch (error) {
        res.status(500).json({ messages: error.messages})
    }
})

module.exports = router