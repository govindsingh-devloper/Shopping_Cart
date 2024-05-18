const express=require("express")
const app=express()
app.use(express.json())



require("dotenv").config()

const apiRouter=require("./Routers/api")

//Connectivity for dB
const mongoose=require('mongoose')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)



app.use(express.static('public'))
app.use("/api",apiRouter)

app.listen(process.env.PORT,()=>{console.log(`Server is runing on port${process.env.PORT}`)})