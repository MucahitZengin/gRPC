const express = require('express')
const connectDatabase = require('./database/connectDatabase')
const routes = require('./routes/index.js')

connectDatabase()


const app = express()
const PORT = 5000
app.use(express.json())
app.use("/api", routes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})