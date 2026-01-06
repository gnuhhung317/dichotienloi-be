import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UserModel } from '../src/models/User';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dichotienloi';

const createAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('🔌 Connected to MongoDB');

        const email = 'a@gmail.com';
        const password = '123456';
        const name = 'Admin';

        // Check if admin already exists
        const existingAdmin = await UserModel.findOne({ email });
        if (existingAdmin) {
            console.log('⚠️  Admin account already exists!');
            console.log('Email:', email);
            console.log('Role:', existingAdmin.role);
            
            // Update to admin role if not already admin
            if (existingAdmin.role !== 'admin') {
                existingAdmin.role = 'admin';
                await existingAdmin.save();
                console.log('✅ Updated existing user to admin role');
            }
        } else {
            // Create new admin account
            const passwordHash = await bcrypt.hash(password, 10);
            
            const admin = await UserModel.create({
                email,
                passwordHash,
                name,
                role: 'admin',
                avatar: 'https://i.pravatar.cc/150?u=admin'
            });

            console.log('✅ Admin account created successfully!');
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Role:', admin.role);
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
};

createAdmin();
