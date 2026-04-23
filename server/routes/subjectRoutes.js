const express = require('express');
const subjectController = require('../controllers/subjectController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', subjectController.getAllSubjects);

// Admin only to create
router.post('/', 
    authMiddleware.protect, 
    authMiddleware.restrictTo('admin'), 
    subjectController.createSubject
);

module.exports = router;
