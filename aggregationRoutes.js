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
    // There are 18 class tables in classes_schema
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
    
    // Get active student counts for each class
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

// Finance summary
router.get('/finance/summary', async (req, res) => {
  try {
    const revenueResult = await pool.query(`
      SELECT COALESCE(SUM(amount_paid), 0) as total 
      FROM monthly_payments 
      WHERE payment_status = 'paid'
    `);
    
    const expensesResult = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM simple_expenses
    `);
    
    const pendingResult = await pool.query(`
      SELECT COALESCE(SUM(amount_due - amount_paid), 0) as total 
      FROM monthly_payments 
      WHERE payment_status = 'pending'
    `);

    const totalRevenue = parseFloat(revenueResult.rows[0].total);
    const totalExpenses = parseFloat(expensesResult.rows[0].total);
    const totalPending = parseFloat(pendingResult.rows[0].total);

    res.json({
      totalRevenue,
      totalExpenses,
      totalPending,
      netProfit: totalRevenue - totalExpenses
    });
  } catch (error) {
    console.error('Error getting finance summary:', error);
    // Return empty data instead of error
    res.json({
      totalRevenue: 0,
      totalExpenses: 0,
      totalPending: 0,
      netProfit: 0
    });
  }
});

// Mark list summary
router.get('/mark-list/summary', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(DISTINCT exam_id) as total_exams,
        COUNT(*) as total_marklists,
        AVG(total_marks) as average_score
      FROM mark_lists
    `);
    
    res.json({
      totalExams: parseInt(result.rows[0].total_exams || 0),
      totalMarklists: parseInt(result.rows[0].total_marklists || 0),
      averageScore: parseFloat(result.rows[0].average_score || 0).toFixed(2)
    });
  } catch (error) {
    console.error('Error getting mark list summary:', error);
    // Return empty data instead of error
    res.json({
      totalExams: 0,
      totalMarklists: 0,
      averageScore: 0
    });
  }
});

// Mark list subjects
router.get('/mark-list/subjects', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT
        s.id,
        s.name,
        s.code
      FROM subjects s
      ORDER BY s.name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting subjects:', error);
    // Return empty array instead of error
    res.json([]);
  }
});

// All mark lists
router.get('/mark-list/all', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        ml.id,
        ml.student_name,
        ml.class_name,
        ml.exam_name,
        ml.subject_name,
        ml.marks_obtained,
        ml.total_marks,
        ml.created_at
      FROM mark_lists ml
      ORDER BY ml.created_at DESC
      LIMIT 1000
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting all mark lists:', error);
    // Return empty array instead of error
    res.json([]);
  }
});

// Evaluations summary
router.get('/evaluations/summary', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_evaluations,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed
      FROM evaluations
    `);
    
    res.json({
      totalEvaluations: parseInt(result.rows[0].total_evaluations || 0),
      pending: parseInt(result.rows[0].pending || 0),
      completed: parseInt(result.rows[0].completed || 0)
    });
  } catch (error) {
    console.error('Error getting evaluations summary:', error);
    res.status(500).json({ error: 'Failed to get evaluations summary' });
  }
});

// Academic terms
router.get('/academic/terms', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        name,
        start_date,
        end_date
      FROM academic_terms
      ORDER BY start_date DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting academic terms:', error);
    // Return empty array instead of error
    res.json([]);
  }
});

// Attendance today
router.get('/attendance/today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'present' THEN 1 END) as present,
        COUNT(CASE WHEN status = 'absent' THEN 1 END) as absent
      FROM attendance
      WHERE date = $1
    `, [today]);
    
    const total = parseInt(result.rows[0].total || 0);
    const present = parseInt(result.rows[0].present || 0);
    const absent = parseInt(result.rows[0].absent || 0);
    
    res.json({
      date: today,
      totalPresent: present,
      totalAbsent: absent,
      attendanceRate: total > 0 ? ((present / total) * 100).toFixed(2) : 0
    });
  } catch (error) {
    console.error('Error getting today attendance:', error);
    // Return empty data instead of error
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
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'present' THEN 1 END) as present,
        COUNT(CASE WHEN status = 'absent' THEN 1 END) as absent
      FROM attendance
      WHERE date = $1
    `, [date]);
    
    const total = parseInt(result.rows[0].total || 0);
    const present = parseInt(result.rows[0].present || 0);
    const absent = parseInt(result.rows[0].absent || 0);
    
    res.json({
      date,
      totalPresent: present,
      totalAbsent: absent,
      attendanceRate: total > 0 ? ((present / total) * 100).toFixed(2) : 0
    });
  } catch (error) {
    console.error('Error getting attendance by date:', error);
    // Return empty data instead of error
    const { date } = req.params;
    res.json({
      date,
      totalPresent: 0,
      totalAbsent: 0,
      attendanceRate: 0
    });
  }
});

// Schedule
router.get('/schedule/all', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        sc.id,
        c.name as class,
        c.section,
        s.name as subject,
        st.name as teacher,
        sc.day,
        sc.start_time,
        sc.end_time
      FROM schedule sc
      LEFT JOIN "Class" c ON sc.class_id = c.id
      LEFT JOIN subjects s ON sc.subject_id = s.id
      LEFT JOIN "Staff" st ON sc.teacher_id = st.id
      ORDER BY sc.day, sc.start_time
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting schedule:', error);
    // Return empty array instead of error
    res.json([]);
  }
});

// Faults summary
router.get('/faults/summary', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_faults,
        COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending
      FROM student_faults
    `);
    
    res.json({
      totalFaults: parseInt(result.rows[0].total_faults || 0),
      resolved: parseInt(result.rows[0].resolved || 0),
      pending: parseInt(result.rows[0].pending || 0)
    });
  } catch (error) {
    console.error('Error getting faults summary:', error);
    // Return empty data instead of error
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
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_posts,
        COUNT(CASE WHEN type = 'announcement' THEN 1 END) as announcements,
        COUNT(CASE WHEN type = 'message' THEN 1 END) as messages
      FROM posts
    `);
    
    res.json({
      totalPosts: parseInt(result.rows[0].total_posts || 0),
      announcements: parseInt(result.rows[0].announcements || 0),
      messages: parseInt(result.rows[0].messages || 0)
    });
  } catch (error) {
    console.error('Error getting posts summary:', error);
    // Return empty data instead of error
    res.json({
      totalPosts: 0,
      announcements: 0,
      messages: 0
    });
  }
});

module.exports = router;
