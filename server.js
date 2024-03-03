const express = require('express')

const app = express()

app.get('/api', async (req, res) => {
    res.json({message: "Hi!"})
})

app.listen(3000)