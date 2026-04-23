const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const users = [
    {
        name: 'System Admin',
        email: 'admin@ias.com',
        password: 'password123',
        role: 'admin'
    },
    {
        name: 'Senior Mentor',
        email: 'mentor@ias.com',
        password: 'password123',
        role: 'mentor'
    },
    {
        name: 'Student User',
        email: 'student@ias.com',
        password: 'password123',
        role: 'student'
    }
];

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB...');

        // Clear existing users
        await User.deleteMany({});
        console.log('Cleared existing users.');

        // Create new users
        // Note: Password hashing is handled by the User model's pre-save middleware
        for (const u of users) {
            await User.create(u);
        }

        console.log('Successfully seeded 3 roles: Admin, Mentor, Student');
        console.log('--------------------------------------------------');
        console.log('Admin Email: admin@ias.com | Password: password123');
        console.log('Mentor Email: mentor@ias.com | Password: password123');
        console.log('Student Email: student@ias.com | Password: password123');
        console.log('--------------------------------------------------');

        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
