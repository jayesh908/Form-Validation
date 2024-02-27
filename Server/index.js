const express = require("express")
const app = express()
const mongooose = require("mongoose")
const path = require("path")
const cors = require("cors")
const dotenv = require("dotenv").config()
const route = require("./Routes/route")
const port = process.env.port
const dburl = process.env.dburl
mongooose.connect(dburl).then(()=>console.log("database Connected")).catch(()=>console.log("Database is not connected"))
app.use('./uploads', express.static(path.join(__dirname, './uploads')));
app.use(express.urlencoded({extended:false}))

app.use(express.json())
app.use(cors())
app.use(route)
app.use(express.urlencoded({extended:false}))

app.listen(port,()=>{
    console.log("Running...")
})