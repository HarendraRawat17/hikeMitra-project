import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./Database/index.js";    



dotenv.config()


connectDB()
.then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is connected at port: ${process.env.PORT}`)
  })
})
.catch((err) => {
  console.log(`MongoDB connection failed!!`, err)
})

