var express = require('express')
var router = express.Router()
const kendaraanModel = require('../model/kendaraanModel')

const fs = require('fs')
const multer = require('multer')
const path = require('path')
const { error } = require('console')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const uploud = multer({storage: storage})

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed'))
    }
    cb(null, true)
}

const limits = { fileSize: 1 * 1024 * 1024}
const update = multer({storage: storage, limits, fileFilter})

router.get('/', async (req, res, next) => {
    try {
        let rows = await kendaraanModel.getAll()
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', async (req, res, next) => {
    let id = req.params.id
    try {
        let rows = await kendaraanModel.getId(id)
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ messege: error.messege })
    }
})

router.post('/store', update.single("gambar_kendaraan"), async (req, res, next) => {
    let {no_pol, nama_kendaraan, id_transmisi} = req.body
    let data = {no_pol, nama_kendaraan, id_transmisi, gambar_kendaraan: req.file.filename}
    let gambar = req?.file?.filename || null

    try {
        await kendaraanModel.Store(data)
        res.status(200).json({ message: 'ok'})
    } catch (error) {
        if (gambar) {
            const newpath = path.join(__dirname, '../public/images/', gambar)
            if (fs.existsSync(newpath)) {
                fs.unlinkSync(newpath)
            }
            res.status(500).json({ message: error.message})
        }
    }
})

router.patch('/update/:id', update.single("gambar_kendaraan"), async (req, res, next) => {
    let id = req.params.id
    let {no_pol, nama_kendaraan, id_transmisi} = req.body
    let gambar = req?.file?.filename|| null

    try {
        let rows = await kendaraanModel.getId(id)
        if (rows || rows.length == 0) {
            if (gambar) {
                const newpath = path.join(__dirname, '../public/images/', gambar)
                if (fs.existsSync(newpath)) {
                    fs.unlinkSync(newpath)
                }
                return res.status(404).json({ message: 'Data kendaraan tidak di temukan' })
            }
        }
        const fileold = rows[0].gambar_kendaraan
        if (gambar && fileold) {
            const pathfile = path.join(__dirname, '../public/images/', fileold)
            if (fs.existsSync(pathfile)) {
                fs.unlinkSync(pathfile)
            }
        }
        let gambar_kendaraan = gambar || fileold
        let data = {no_pol, nama_kendaraan, id_transmisi, gambar_kendaraan}    

        await kendaraanModel.update(id, data)
        res.status(200).json({message: 'ok'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    let id = req.params.id
    try {
        let rows = await kendaraanModel.getId(id)
        if (!rows || rows.length == 0) {
            return res.status(404).json({ message: 'Data kendaraan tidak ditemuakn'})
        }
        const fileold = rows[0].gambar_kendaraan
        if (fileold) {
            const pathfile = path.join(__dirname, '../public/images/', fileold)
            fs.unlinkSync(pathfile)
        }
        await kendaraanModel.delete(id)
        res.status(200).json({message: 'ok'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

module.exports = router