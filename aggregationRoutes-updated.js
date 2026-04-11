// aggregationRoutes.js - Super Admin Dashboard Aggregation Endpoints
// For iqrab3.skoolific.com backend - Updated for actual database structure

const express = require('express');
const pool = require('../config/db');

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Branch API is running',
    timestamp: new Date().toISOString()
  });
});

// Students count - Sum from all class tables (active only)
router.get('/students/count', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM classes_schema."GRADE10" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE11" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE12" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE7" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE8" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE9" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."KG1A" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."KG1B" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."KG2A" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."KG2B" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE1A" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE1B" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE2" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE3" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE4A" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE4B" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE5" WHERE is_active = true) +
        (SELECT COUNT(*) FROM classes_schema."GRADE6" WHERE is_active = true) as total
    `);
    res.json({ total: parseInt(result.rows[0].total) });
  } catch (error) {
    console.error('Error getting students count:', error);
    res.status(500).json({ error: 'Failed to get students count' });
  }
});

// All students - Union from all class tables (active only)
router.get('/students/all', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, student_name as name, '' as email, guardian_phone as phone, id::text as student_id, 'GRADE10' as grade, 'Male' as gender, 'active' as status FROM classes_schema."GRADE10" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE11', 'Male', 'active' FROM classes_schema."GRADE11" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE12', 'Male', 'active' FROM classes_schema."GRADE12" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE7', 'Male', 'active' FROM classes_schema."GRADE7" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE8', 'Male', 'active' FROM classes_schema."GRADE8" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE9', 'Male', 'active' FROM classes_schema."GRADE9" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'KG1A', 'Male', 'active' FROM classes_schema."KG1A" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'KG1B', 'Male', 'active' FROM classes_schema."KG1B" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'KG2A', 'Male', 'active' FROM classes_schema."KG2A" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'KG2B', 'Male', 'active' FROM classes_schema."KG2B" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE1A', 'Male', 'active' FROM classes_schema."GRADE1A" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE1B', 'Male', 'active' FROM classes_schema."GRADE1B" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE2', 'Male', 'active' FROM classes_schema."GRADE2" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE3', 'Male', 'active' FROM classes_schema."GRADE3" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE4A', 'Male', 'active' FROM classes_schema."GRADE4A" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE4B', 'Male', 'active' FROM classes_schema."GRADE4B" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE5', 'Male', 'active' FROM classes_schema."GRADE5" WHERE is_active = true
      UNION ALL SELECT id, student_name, '', guardian_phone, id::text, 'GRADE6', 'Male', 'active' FROM classes_schema."GRADE6" WHERE is_active = true
      ORDER BY name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting all students:', error);
    res.status(500).json({ error: 'Failed to get students' });
  }
});

// Staff count - From public.staff_users (active only)
router.get('/staff/count', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as total FROM public.staff_users WHERE is_active = true');
    res.json({ total: parseInt(result.rows[0].total) });
  } catch (error) {
    console.error('Error getting staff count:', error);
    res.status(500).json({ error: 'Failed to get staff count' });
  }
});

// All staff - From public.staff_users (active only)
router.get('/staff/all', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        name,
        email,
        phone,
        role,
        '' as subject
      FROM public.staff_users
      WHERE is_active = true
      ORDER BY name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting all staff:', error);
    res.status(500).json({ error: 'Failed to get staff' });
  }
});

// Classes count - Return 18 (number of class tables)
router.get('/classes/count', async (req, res) => {
  try {
    res.json({ total: 18 });
  } catch (error) {
    console.error('Error getting classes count:', error);
    res.json({ total: 18 });
  }
});

// All classes - List of all class tables with student counts
router.get('/classes/all', async (req, res) => {
  try {
    const classes = [
      { id: 1, name: 'GRADE10', section: '', total_students: 0, class_teacher: '' },
      { id: 2, name: 'GRADE11', section: '', total_students: 0, class_teacher: '' },
      { id: 3, name: 'GRADE12', section: '', total_students: 0, class_teacher: '' },
      { id: 4, name: 'GRADE7', section: '', total_students: 0, class_teacher: '' },
      { id: 5, name: 'GRADE8', section: '', total_students: 0, class_teacher: '' },
      { id: 6, name: 'GRADE9', section: '', total_students: 0, class_teacher: '' },
      { id: 7, name: 'KG1A', section: '', total_students: 0, class_teacher: '' },
      { id: 8, name: 'KG1B', section: '', total_students: 0, class_teacher: '' },
      { id: 9, name: 'KG2A', section: '', total_students: 0, class_teacher: '' },
      { id: 10, name: 'KG2B', section: '', total_students: 0, class_teacher: '' },
      { id: 11, name: 'GRADE1A', section: '', total_students: 0, class_teacher: '' },
      { id: 12, name: 'GRADE1B', section: '', total_students: 0, class_teacher: '' },
      { id: 13, name: 'GRADE2', section: '', total_students: 0, class_teacher: '' },
      { id: 14, name: 'GRADE3', section: '', total_students: 0, class_teacher: '' },
      { id: 15, name: 'GRADE4A', section: '', total_students: 0, class_teacher: '' },
      { id: 16, name: 'GRADE4B', section: '', total_students: 0, class_teacher: '' },
      { id: 17, name: 'GRADE5', section: '', total_students: 0, class_teacher: '' },
      { id: 18, name: 'GRADE6', section: '', total_students: 0, class_teacher: '' }
    ];
    
    for (const cls of classes) {
      try {
        const result = await pool.query(`SELECT COUNT(*) as count FROM classes_schema."${cls.name}" WHERE is_active = true`);
        cls.total_students = parseInt(result.rows[0].count);
      } catch (e) {
        // Keep default 0
      }
    }
    
    res.json(classes);
  } catch (error) {
    console.error('Error getting all classes:', error);
    res.status(500).json({ error: 'Failed to get classes' });
  }
});

// Finance summary - Using fee_payments table
router.get('/finance/summary', async (req, res) => {
  try {
    const revenueResult = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM fee_payments 
      WHERE status = 'paid'
    `);
    
    const pendingResult = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM fee_payments 
      WHERE status = 'pending'
    `);

    const totalRevenue = parseFloat(revenueResult.rows[0].total);
    const totalPending = parseFloat(pendingResult.rows[0].total);

    res.json({
      totalRevenue,
      totalExpenses: 0,
      totalPending,
      netProfit: totalRevenue
    });
  } catch (error) {
    console.error('Error getting finance summary:', error);
    res.json({
      totalRevenue: 0,
      totalExpenses: 0,
      totalPending: 0,
      netProfit: 0
    });
  }
});

// Mark list summary - No mark_lists table, return empty
router.get('/mark-list/summary', async (req, res) => {
  try {
    res.json({
      totalExams: 0,
      totalMarklists: 0,
      averageScore: 0
    });
  } catch (error) {
    console.error('Error getting mark list summary:', error);
    res.json({
      totalExams: 0,
      totalMarklists: 0,
      averageScore: 0
    });
  }
});

// Mark list subjects - No subjects table
router.get('/mark-list/subjects', async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error('Error getting subjects:', error);
    res.json([]);
  }
});

// All mark lists - No mark_lists table
router.get('/mark-list/all', async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error('Error getting all mark lists:', error);
    res.json([]);
  }
});

// Evaluations summary
router.get('/evaluations/summary', async (req, res) => {
  try {
    res.json({
      totalEvaluations: 0,
      pending: 0,
      completed: 0
    });
  } catch (error) {
    console.error('Error getting evaluations summary:', error);
    res.json({
      totalEvaluations: 0,
      pending: 0,
      completed: 0
    });
  }
});

// Academic terms
router.get('/academic/terms', async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error('Error getting academic terms:', error);
    res.json([]);
  }
});

// Attendance today - Using academic_student_attendance table
router.get('/attendance/today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    // Get attendance for today
    const result = await pool.query(`
      SELECT 
        COUNT(CASE WHEN UPPER(status) = 'PRESENT' THEN 1 END) as present_count,
        COUNT(CASE WHEN UPPER(status) = 'ABSENT' THEN 1 END) as absent_count
      FROM academic_student_attendance
      WHERE date = $1
    `, [today]);
    
    const present = parseInt(result.rows[0].present_count || 0);
    const absent = parseInt(result.rows[0].absent_count || 0);
    
    res.json({
      date: today,
      totalPresent: present,
      totalAbsent: absent,
      attendanceRate: (present + absent) > 0 ? ((present / (present + absent)) * 100).toFixed(2) : 0
    });
  } catch (error) {
    console.error('Error getting today attendance:', error);
    const today = new Date().toISOString().split('T')[0];
    res.json({
      date: today,
      totalPresent: 0,
      totalAbsent: 0,
      attendanceRate: 0
    });
  }
});

// Attendance by date
router.get('/attendance/date/:date', async (req, res) => {
  try {
    const { date } = req.params;
    // Get attendance for specific date
    const result = await pool.query(`
      SELECT 
        COUNT(CASE WHEN UPPER(status) = 'PRESENT' THEN 1 END) as present_count,
        COUNT(CASE WHEN UPPER(status) = 'ABSENT' THEN 1 END) as absent_count
      FROM academic_student_attendance
      WHERE date = $1
    `, [date]);
    
    const present = parseInt(result.rows[0].present_count || 0);
    const absent = parseInt(result.rows[0].absent_count || 0);
    
    res.json({
      date,
      totalPresent: present,
      totalAbsent: absent,
      attendanceRate: (present + absent) > 0 ? ((present / (present + absent)) * 100).toFixed(2) : 0
    });
  } catch (error) {
    console.error('Error getting attendance by date:', error);
    const { date } = req.params;
    res.json({
      date,
      totalPresent: 0,
      totalAbsent: 0,
      attendanceRate: 0
    });
  }
});

// All attendance records
router.get('/attendance/all', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        student_id,
        student_name,
        class_name as grade,
        date,
        status,
        check_in_time,
        check_out_time,
        notes
      FROM academic_student_attendance
      ORDER BY date DESC, student_name
      LIMIT 1000
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting all attendance:', error);
    res.json([]);
  }
});

// Schedule
router.get('/schedule/all', async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error('Error getting schedule:', error);
    res.json([]);
  }
});

// Faults summary
router.get('/faults/summary', async (req, res) => {
  try {
    res.json({
      totalFaults: 0,
      resolved: 0,
      pending: 0
    });
  } catch (error) {
    console.error('Error getting faults summary:', error);
    res.json({
      totalFaults: 0,
      resolved: 0,
      pending: 0
    });
  }
});

// Posts/Communications summary
router.get('/posts/summary', async (req, res) => {
  try {
    res.json({
      totalPosts: 0,
      announcements: 0,
      messages: 0
    });
  } catch (error) {
    console.error('Error getting posts summary:', error);
    res.json({
      totalPosts: 0,
      announcements: 0,
      messages: 0
    });
  }
});

module.exports = router;
