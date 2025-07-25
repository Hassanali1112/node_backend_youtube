// import express from "express"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
  path : "./.env"
})

// const app = express()

// app.listen(process.env.PORT, ()=>{
//       console.log("DataBase connected...")
//     })

;(async()=>{
    try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", (error)=>{
      console.log("errr", error)
    })
    app.listen(process.env.PORT, ()=>{
      console.log("DataBase connected...")
    })

  } catch (error) {
    
  }
})(

)

// console.log("working")