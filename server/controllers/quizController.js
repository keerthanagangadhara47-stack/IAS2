const mongoose = require('mongoose');
const Question = require('../models/Question');
const Attempt = require('../models/Attempt');

exports.generateAdaptiveQuiz = async (req, res) => {
    try {
        const { subjectId, numQuestions = 10 } = req.body;
        const userId = req.user._id;

        // 1. Get user's last attempt for this subject to determine starting difficulty
        const lastAttempt = await Attempt.findOne({ user: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'answers.question',
                match: { subject: subjectId }
            });

        let baseDifficulty = 1; // Default starting difficulty
        if (lastAttempt && lastAttempt.score) {
            const performanceRatio = lastAttempt.score / lastAttempt.totalMarks;
            if (performanceRatio > 0.8) baseDifficulty = Math.min(5, lastAttempt.answers[0]?.question?.difficulty + 1 || 3);
            else if (performanceRatio < 0.4) baseDifficulty = Math.max(1, lastAttempt.answers[0]?.question?.difficulty - 1 || 1);
            else baseDifficulty = lastAttempt.answers[0]?.question?.difficulty || 2;
        }

        // 2. Fetch questions based on adaptive difficulty
        // Mix: 60% baseDifficulty, 20% base+1, 20% base-1
        const questions = await Question.aggregate([
            { $match: { subject: new mongoose.Types.ObjectId(subjectId), type: 'MCQ' } },
            { $sample: { size: numQuestions } } // Simple sample for now, logic can be more complex
        ]);

        res.status(200).json({
            success: true,
            data: { questions }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.submitQuiz = async (req, res) => {
    try {
        const { quizId, answers } = req.body; // answers: [{questionId, selectedOption}]
        let score = 0;
        const processedAnswers = [];

        for (const ans of answers) {
            const question = await Question.findById(ans.questionId);
            const isCorrect = question.correctOption === ans.selectedOption;
            if (isCorrect) score += 1;

            processedAnswers.push({
                question: ans.questionId,
                selectedOption: ans.selectedOption,
                isCorrect
            });
        }

        const attempt = await Attempt.create({
            user: req.user._id,
            quiz: quizId,
            answers: processedAnswers,
            score,
            totalMarks: answers.length,
            status: 'completed'
        });

        res.status(201).json({
            success: true,
            data: { attempt }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
