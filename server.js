const express = require("express")
// require('dotenv').config();
const router = require('./src/students/routes')
const app = express()
const port = 3000
app.use(express.json());

app.use('/api/students', router)
app.listen(port, () => console.log(`app listimg in port ${port}`))
