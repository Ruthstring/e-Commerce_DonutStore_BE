const express = require('express');
const { getFeaturedItems } = require('../controllers/featuredController');
const router = express.Router();

router.get("/", getFeaturedItems)

module.exports=router