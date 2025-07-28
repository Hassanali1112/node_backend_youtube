import dotenv from "dotenv"
import { app } from "./app.js";
import { connectDB } from "./database/index.js";

dotenv.config({
  path : "./.env"
})

const PORT = process.env.PORT || 8080

connectDB()
.then(()=>{
  
    app.listen(PORT, ()=>{
      console.log(`server is running on port ${PORT}`)
    })
  
})
.catch((error)=>{
  console.log(error)
})


// second approch to connect DB

// const app = express()

// app.listen(process.env.PORT, ()=>{
//       console.log("DataBase connected...")
//     })

// (async()=>{
//     try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("error", (error)=>{
//       console.log("errr", error)
//     })
//     app.listen(process.env.PORT, ()=>{
//       console.log("DataBase connected...")
//     })

//   } catch (error) {
    
//   }
// })(

// )

// console.log("working")