import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// connect to mongodb
(async()=>{
  try {
    const connectionInstance= await mongoose.connect(`${process.env.MONGODBURI}`)
    console.log(`\n MongoDb connection: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Error",error);
  }
})();

//Defining Routes
app.use("/book",bookRoute);
app.use("/user",userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});