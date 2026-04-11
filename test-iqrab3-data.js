const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const pool = require('./config/db');

async function testData() {
  try {
    console.log('=== Testing with Prisma ===');
    const studentCount = await prisma.student.count();
    console.log('Students (Prisma):', studentCount);
    
    const classCount = await prisma.class.count();
    console.log('Classes (Prisma):', classCount);
    
    try {
      const staffCount = await prisma.staff.count();
      console.log('Staff (Prisma):', staffCount);
    } catch (e) {
      console.log('Staff (Prisma): Error -', e.message);
    }
    
    console.log('\n=== Testing with Raw SQL ===');
    const studentResult = await pool.query('SELECT COUNT(*) FROM school_comms."Student"');
    console.log('Students (SQL):', studentResult.rows[0].count);
    
    const classResult = await pool.query('SELECT COUNT(*) FROM school_comms."Class"');
    console.log('Classes (SQL):', classResult.rows[0].count);
    
    const staffResult = await pool.query('SELECT COUNT(*) FROM school_comms."Staff"');
    console.log('Staff (SQL):', staffResult.rows[0].count);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

testData();
