import express from "express";
import initializeDb from "./connection/connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./api/routes/user.route.js";
import organizationRouter from "./api/routes/organization.route.js";
import productRouter from "./api/routes/product.route.js";
import validationRouter from "./api/routes/validation.route.js";
import documentRouter from "./api/routes/document.route.js";
import supplierRouter from "./api/routes/supplier.route.js";

const app = express();
const port = 5000;
dotenv.config();
const url = process.env.MONGODB_URL;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

initializeDb(url).then((successful) => {
  if (successful) {
    app.use(userRouter);
    app.use(organizationRouter);
    app.use(productRouter);
    app.use(validationRouter);
    app.use(documentRouter);
    app.use(supplierRouter);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } else {
    console.log("Database Connection Failed");
  }
});
