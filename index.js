const express = require('express');
require('dotenv').config()
const postsRouter = require('./routes/Post')
const usersRouter = require('./routes/User')
const categoriesRouter = require('./routes/Category')
const tagsRouter = require('./routes/Tag')

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json())
const db = require('./config/database')

app.use('/api/v1', postsRouter)
app.use('/api/v1', usersRouter)
app.use('/api/v1', categoriesRouter)
app.use('/api/v1', tagsRouter)

db.authenticate().then(() => {
    console.log('Connection has been established successfully!')
}).catch(err => {
    console.error("Unable to connect to the database:", err)
})
app.listen(port, () => {
    console.log("Server is running on port:", port)
})