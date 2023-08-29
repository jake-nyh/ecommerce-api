const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const brandRouter = require('./routes/brand');
const orderRouter = require('./routes/order');
const cartRouter = require('./routes/cart');    
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middleware/errorHandlerMiddleware');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config()

//db connection
dbConnect()

//middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

//Routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter)
app.use('/api/brand', brandRouter)
app.use('/api/order', orderRouter)
app.use('/api/cart', cartRouter)

app.use(notFound)
app.use(errorHandler)

let port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("server is running on port `${port}`")
})

