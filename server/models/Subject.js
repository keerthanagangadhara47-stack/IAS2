const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subject name is required'],
        unique: true,
        trim: true
    },
    description: String,
    topics: [{
        name: {
            type: String,
            required: true
        },
        description: String
    }],
    category: {
        type: String,
        enum: ['Prelims', 'Mains', 'Both'],
        default: 'Both'
    }
}, {
    timestamps: true
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
