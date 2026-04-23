const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Question text is required']
    },
    type: {
        type: String,
        enum: ['MCQ', 'Subjective'],
        default: 'MCQ'
    },
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject',
        required: true
    },
    topic: String,
    difficulty: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    options: [String], // For MCQ
    correctOption: Number, // Index for MCQ
    explanation: String,
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
