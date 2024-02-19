const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const productRoutes=require('./routes/productRoutes')
const cartRoutes=require('./routes/cartRoutes')
const orderRoutes=require('./routes/orderRoutes')
const app = express();
const PORT = process.env.PORT;

//mongodb connection
mongoose.connect(process.env.MONGO_URL);

//middleware
app.use(express.json());

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/product",productRoutes)
app.use("/api/v1/cart",cartRoutes)
app.use("/api/v1/order",orderRoutes)
//listening the port
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
