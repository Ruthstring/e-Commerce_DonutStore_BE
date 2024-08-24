const express = require('express');
const router = express.Router();

const {getMenu}=require("../controllers/menuController")

// GET all menu items
router.get('/', getMenu);

module.exports=router;