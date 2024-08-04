import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./src/database/dbConfig.js";
import cors from "cors";

import employeeRoute from "./src/routes/employeeRoute.js";
import loginRoute from "./src/routes/loginRoutes.js";
import reviewRoute from "./src/routes/reviewRoute.js"

const app = express();

configDotenv();

const PORT = process.env.PORT || 5000; 

app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Define routes
app.use("/api/v1/employees", employeeRoute);
app.use("/api/v1/employees", loginRoute); 
app.use('/api/v1/reviews', reviewRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 