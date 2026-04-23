const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Subject = require('./models/Subject');
const Question = require('./models/Question');
const User = require('./models/User');

dotenv.config();

const subjects = [
    {
        name: 'Indian Polity',
        description: 'Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues, etc.',
        topics: [
            { name: 'Preamble', description: 'The introductory statement of the Constitution.' },
            { name: 'Fundamental Rights', description: 'Part III of the Constitution.' }
        ]
    },
    {
        name: 'Geography',
        description: 'Physical, Social, Economic Geography of India and the World.',
        topics: [
            { name: 'Indian Rivers', description: 'River systems of India.' },
            { name: 'Climate', description: 'Weather patterns and climate zones.' }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected for seeding...');

        // Clear existing data
        await Subject.deleteMany({});
        await Question.deleteMany({});

        // Add Subjects
        const createdSubjects = await Subject.insertMany(subjects);
        console.log('Subjects added!');

        // Add Sample Questions
        const questions = [
            {
                text: 'Which article of the Indian Constitution deals with the Right to Equality?',
                type: 'MCQ',
                subject: createdSubjects[0]._id,
                topic: 'Fundamental Rights',
                difficulty: 1,
                options: ['Article 12', 'Article 14', 'Article 21', 'Article 32'],
                correctOption: 1,
                explanation: 'Article 14 guarantees equality before the law.'
            },
            {
                text: 'The "Tropic of Cancer" does NOT pass through which of these Indian states?',
                type: 'MCQ',
                subject: createdSubjects[1]._id,
                topic: 'Geography',
                difficulty: 2,
                options: ['Gujarat', 'Rajasthan', 'Odisha', 'West Bengal'],
                correctOption: 2,
                explanation: 'The Tropic of Cancer passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram. It does not pass through Odisha.'
            }
        ];

        await Question.insertMany(questions);
        console.log('Questions added!');

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();
