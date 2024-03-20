const express = require("express");
const router = express.Router();
const Product = require('../models/product');

router.post('/', async (req, res) => {
  const { item, hsn, quantity, mrp, tax, discount, exp } = req.body;

  try {
      const newItem = new Product({
          registerDate: new Date(),
          item,
          hsn,
          quantity,
          mrp,
          tax,
          discount,
          expiryDate: new Date(exp),
          user: req.userId
      });

      const savedItem = await newItem.save();
      console.log('Item saved:', savedItem);
      
      res.status(201).json(savedItem); // Respond with the saved item
  } catch (error) {
      console.error('Error saving item:', error);
      res.status(500).json({ error: 'Internal Server Error' }); // Respond with an error
  }
});


router.get('/', async (req, res) => {
  const userId = req.userId; 
  try {
      const stockData = await Product.find({ user: userId });
      
      if (stockData.length > 0) {
          console.log('Found stock:', stockData);
          res.json(stockData);
      } else {
          res.status(404).json({ error: 'No documents found for the user' });
      }
  } catch (error) {
      console.error('Error finding user stock:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch('/product/:productId', async (req, res) => {
  try {
      const productId = req.params.productId; 
      console.log(productId);

      const updatedProduct = await Product.findOneAndUpdate(
          { _id: productId }, 
          req.body,
          { new: true }
      );

      if (!updatedProduct) {
          
          return res.status(404).json({ error: 'Product not found' });
      }

      console.log('Updated product:', updatedProduct);
      res.json(updatedProduct);
  } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/product/:productId', async (req, res) => {
  try {
      const productId = req.params.productId;
      const deletedProduct = await Product.findOneAndDelete({ _id: productId });
      if (!deletedProduct) {
          
          return res.status(404).json({ error: 'Product not found' });
      }
      console.log('Deleted product:', deletedProduct);
      res.json(deletedProduct);
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;