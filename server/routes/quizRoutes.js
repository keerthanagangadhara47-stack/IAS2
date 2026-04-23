const express = require('express');
const quizController = require('../controllers/quizController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/generate', quizController.generateAdaptiveQuiz);
router.post('/submit', quizController.submitQuiz);

module.exports = router;
