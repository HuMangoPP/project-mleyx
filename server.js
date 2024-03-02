const express = require('express')
const multer = require('multer')
const sql = require('mssql')
const cors = require('cors')
const { BlobServiceClient } = require('@azure/storage-blob')
const fs = require('fs')
require('dotenv').config()

const app = express()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    }, 
    filename: (req, file, cb) => {
    const extArray = file.mimetype.split("/")
    const ext = extArray[extArray.length - 1]
    cb(null, `${Date.now()}.${ext}`)
}})
const upload = multer({storage})
const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PW,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DB,
    options: {
        encrypt: true
    }
}

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.BLOB_CONN_STRING)
const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_TABLE)


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN
}))
app.use(express.static('./uploads'))

app.get('/', async (req, res) => {
    const conn = await sql.connect(config)
    const recordSet = await conn.request().query("SELECT * FROM dbo.Listings ORDER BY timestamp DESC")
    res.json(recordSet.recordset)
})

app.get('/:id', async (req, res) => {
    const filepath = `./uploads/${req.params.id}`
    const blockBlobClient = containerClient.getBlockBlobClient(req.file.filename)
    await blockBlobClient.downloadToFile(filepath)
    
    res.sendFile(filepath)
})

app.post('/', upload.single('image'), async (req, res) => {
    const conn = await sql.connect(config)
    const transaction = await conn.transaction()
    transaction.begin(err => {
        console.error(err)
        transaction.request().query(`INSERT INTO dbo.Listings (id, name, about, timestamp, image) VALUES ('${req.body.id}', '${req.body.name}', '${req.body.about}', '${req.body.timestamp}', '${req.file.filename}')`, (err, result) => {
            console.error(err)
            transaction.commit(err => {
                console.error(err)
            })
        })
    })
    fs.readFile(`./uploads/${req.file.filename}`, async (err, data) => {
        const buffer = Buffer.from(data, 'base64')
        const blockBlobClient = containerClient.getBlockBlobClient(req.file.filename)
        const response = await blockBlobClient.uploadData(buffer, {
            blobHTTPHeaders: {
                blobContentType: req.file.mimetype
            }
        })
    })
    res.json({})
})

app.listen(8080)
