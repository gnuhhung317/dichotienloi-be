import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UnitModel } from '../src/models/Unit';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dichotienloi';

const fetchUnits = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('🔌 Connected to MongoDB');

        // Fetch all units
        const units = await UnitModel.find({}).lean();
        
        console.log(`\n📊 Total units found: ${units.length}\n`);
        
        // Display all units
        console.log('═══════════════════════════════════════════════════════');
        units.forEach((unit, index) => {
            console.log(`\n[${index + 1}] Unit:`);
            console.log('  ID:', unit._id);
            console.log('  Name:', unit.name);
            
            // Check for potential errors
            const issues = [];
            
            if (!unit.name || unit.name.trim() === '') {
                issues.push('Empty or missing name');
            }
            
            if (unit.name && (unit.name.includes('-1') || unit.name.match(/-\d+/))) {
                issues.push('Contains negative number pattern');
            }
            
            if (unit.name && unit.name.length < 1) {
                issues.push('Name too short');
            }
            
            if (issues.length > 0) {
                console.log('  ⚠️  ISSUES:', issues.join(', '));
            }
            
            console.log('  Raw data:', JSON.stringify(unit, null, 2));
        });
        console.log('\n═══════════════════════════════════════════════════════');

        // Summary of potential issues
        const problematicUnits = units.filter(unit => {
            return !unit.name || 
                   unit.name.trim() === '' || 
                   unit.name.includes('-1') || 
                   unit.name.match(/-\d+/);
        });

        if (problematicUnits.length > 0) {
            console.log(`\n⚠️  Found ${problematicUnits.length} unit(s) with potential issues:`);
            problematicUnits.forEach(unit => {
                console.log(`  - ID: ${unit._id}, Name: "${unit.name}"`);
            });
        } else {
            console.log('\n✅ No obvious issues found in units');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
    }
};

fetchUnits();
