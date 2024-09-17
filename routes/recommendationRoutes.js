const { getRecommendations } = require('../controllers/recommendationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = require('express').Router();

router.post('/', authMiddleware, getRecommendations);

module.exports = router;