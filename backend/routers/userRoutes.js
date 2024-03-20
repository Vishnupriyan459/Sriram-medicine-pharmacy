const express = require("express");   
const router = express.Router();
router.get('/user', async (req, res) => {
    
    res.send(`you got it ${req.userId}`)
    
})
module.exports = router;