// const express = require("express");
// const router = express.Router();
// const Product = require('../models/SalesInfo');
// router.get('/info',async(req,res)=>{
//     try {
//         // Calculate total revenue
//         const billsTotal = await Bill.aggregate([{ $group: { _id: null, total: { $sum: "$total_amount" } } }]);
//         const invoicesTotal = await Invoice.aggregate([{ $group: { _id: null, total: { $sum: "$total_amount" } } }]);
//         const totalRevenue = (billsTotal[0]?.total || 0) + (invoicesTotal[0]?.total || 0);

//         // Calculate total sales
//         const totalSales = await Bill.countDocuments() + await Invoice.countDocuments();

//         res.send({ totalRevenue, totalSales });
//     } catch (error) {
//         console.error('Error calculating sales info:', error);
//         res.status(500).send('Internal Server Error');
//     }

// })