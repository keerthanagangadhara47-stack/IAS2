const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    quiz: {
        type: mongoose.Schema.ObjectId,
        ref: 'Quiz'
    },
    answers: [{
        question: {
            type: mongoose.Schema.ObjectId,
            ref: 'Question'
        },
        selectedOption: Number,
        isCorrect: Boolean,
        marksObtained: Number,
        feedback: String // For subjective answers
    }],
    score: {
        type: Number,
        default: 0
    },
    totalMarks: Number,
    startTime: Date,
    endTime: Date,
    status: {
        type: String,
        enum: ['in-progress', 'completed', 'evaluated'],
        default: 'completed'
    },
    aiAnalysis: {
        weakTopics: [String],
        recommendations: String
    }
}, {
    timestamps: true
});

const Attempt = mongoose.model('Attempt', attemptSchema);

module.exports = Attempt;
