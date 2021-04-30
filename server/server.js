const express = require('express')
const app = express()

//connect db
const ConnectDB = require('./config/db')
ConnectDB();
// Init middleware
app.use(express.json({ extended: false }))

//routes
app.get('/', (req, res) => res.send("Ok fine!"));
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/details', require('./routes/api/details'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))