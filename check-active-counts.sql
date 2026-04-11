-- Check active staff
SELECT COUNT(*) as active_staff FROM public.staff_users WHERE status = 'active';

-- Check active students per class
SELECT 'GRADE10' as class, COUNT(*) as active FROM classes_schema."GRADE10" WHERE status = 'active'
UNION ALL SELECT 'GRADE11', COUNT(*) FROM classes_schema."GRADE11" WHERE status = 'active'
UNION ALL SELECT 'GRADE12', COUNT(*) FROM classes_schema."GRADE12" WHERE status = 'active'
UNION ALL SELECT 'GRADE7', COUNT(*) FROM classes_schema."GRADE7" WHERE status = 'active'
UNION ALL SELECT 'GRADE8', COUNT(*) FROM classes_schema."GRADE8" WHERE status = 'active'
UNION ALL SELECT 'GRADE9', COUNT(*) FROM classes_schema."GRADE9" WHERE status = 'active'
UNION ALL SELECT 'KG1A', COUNT(*) FROM classes_schema."KG1A" WHERE status = 'active'
UNION ALL SELECT 'KG1B', COUNT(*) FROM classes_schema."KG1B" WHERE status = 'active'
UNION ALL SELECT 'KG2A', COUNT(*) FROM classes_schema."KG2A" WHERE status = 'active'
UNION ALL SELECT 'KG2B', COUNT(*) FROM classes_schema."KG2B" WHERE status = 'active'
UNION ALL SELECT 'GRADE1A', COUNT(*) FROM classes_schema."GRADE1A" WHERE status = 'active'
UNION ALL SELECT 'GRADE1B', COUNT(*) FROM classes_schema."GRADE1B" WHERE status = 'active'
UNION ALL SELECT 'GRADE2', COUNT(*) FROM classes_schema."GRADE2" WHERE status = 'active'
UNION ALL SELECT 'GRADE3', COUNT(*) FROM classes_schema."GRADE3" WHERE status = 'active'
UNION ALL SELECT 'GRADE4A', COUNT(*) FROM classes_schema."GRADE4A" WHERE status = 'active'
UNION ALL SELECT 'GRADE4B', COUNT(*) FROM classes_schema."GRADE4B" WHERE status = 'active'
UNION ALL SELECT 'GRADE5', COUNT(*) FROM classes_schema."GRADE5" WHERE status = 'active'
UNION ALL SELECT 'GRADE6', COUNT(*) FROM classes_schema."GRADE6" WHERE status = 'active';

-- Total active students
SELECT SUM(active) as total_active_students FROM (
  SELECT COUNT(*) as active FROM classes_schema."GRADE10" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE11" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE12" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE7" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE8" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE9" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."KG1A" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."KG1B" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."KG2A" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."KG2B" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE1A" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE1B" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE2" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE3" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE4A" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE4B" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE5" WHERE status = 'active'
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE6" WHERE status = 'active'
) as counts;
