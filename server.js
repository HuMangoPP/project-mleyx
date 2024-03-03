const express = require('express')
const multer = require('multer')
const sql = require('mssql')
const cors = require('cors')
const { BlobServiceClient } = require('@azure/storage-blob')
require('dotenv').config()

const app = express()
const storage = multer.memoryStorage()
const upload = multer({storage})
const config = {
    user: process.env.APPSETTING_SQL_USER,
    password: process.env.APPSETTING_SQL_PW,
    server: process.env.APPSETTING_SQL_SERVER,
    database: process.env.APPSETTING_SQL_DB,
    options: {
        encrypt: true
    }
}

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.APPSETTING_BLOB_CONN_STRING)
const containerClient = blobServiceClient.getContainerClient(process.env.APPSETTING_BLOB_TABLE)


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.APPSETTING_FRONTEND_ORIGIN
}))

app.get('/', async (req, res) => {
    const conn = await sql.connect(config)
    const recordSet = await conn.request().query("SELECT * FROM dbo.Listings ORDER BY timestamp DESC")
    res.json(recordSet.recordset)
})

app.post('/new', upload.single('image'), async (req, res) => {
    const filename = `${Date.now()}-${req.file.originalname}`

    const blockBlobClient = containerClient.getBlockBlobClient(filename)
    // await blockBlobClient.uploadData(req.file.buffer)

    const conn = await sql.connect(config)
    await conn.request().query(`INSERT INTO dbo.Listings (id, name, about, timestamp, image) VALUES ('${req.body.id}', '${req.body.name}', '${req.body.about}', '${req.body.timestamp}', '${blockBlobClient.url}')`)

    res.json({})
})

app.listen(process.env.PORT || 3000)