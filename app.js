const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const { Sequelize } = require('sequelize')
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)
app.use(morgan('tiny'))


const sequelize = new Sequelize('db_movies', 'postgres', '12345678', {
    host: 'localhost',
    dialect: 'postgres'
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})