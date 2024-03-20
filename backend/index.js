const express=require('express')
const app=express()
const router=express.Router()
const path=require('path');
const fs =require('fs');
const PORT=3050;
const home=require('./routers/root')
const connectDB=require('./config/db')
const authMiddleware = require('./middleware/authMiddleware');
const userRoutes = require('./routers/userRoutes');
const StockRoutes = require('./routers/StockRoutes');
const SalesRoutes=require('./routers/SalesRoutes');
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB();

//router
app.use('/',home);
app.use('/users', authMiddleware, userRoutes);
app.use('/stock',authMiddleware,StockRoutes);
// app.use('/sales',authMiddleware,SalesRoutes);






app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})