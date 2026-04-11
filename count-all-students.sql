-- Count students in each class
SELECT 'GRADE10' as class, COUNT(*) as students FROM classes_schema."GRADE10"
UNION ALL
SELECT 'GRADE11', COUNT(*) FROM classes_schema."GRADE11"
UNION ALL
SELECT 'GRADE12', COUNT(*) FROM classes_schema."GRADE12"
UNION ALL
SELECT 'GRADE7', COUNT(*) FROM classes_schema."GRADE7"
UNION ALL
SELECT 'GRADE8', COUNT(*) FROM classes_schema."GRADE8"
UNION ALL
SELECT 'GRADE9', COUNT(*) FROM classes_schema."GRADE9"
UNION ALL
SELECT 'KG1A', COUNT(*) FROM classes_schema."KG1A"
UNION ALL
SELECT 'KG1B', COUNT(*) FROM classes_schema."KG1B"
UNION ALL
SELECT 'KG2A', COUNT(*) FROM classes_schema."KG2A"
UNION ALL
SELECT 'KG2B', COUNT(*) FROM classes_schema."KG2B"
UNION ALL
SELECT 'GRADE1A', COUNT(*) FROM classes_schema."GRADE1A"
UNION ALL
SELECT 'GRADE1B', COUNT(*) FROM classes_schema."GRADE1B"
UNION ALL
SELECT 'GRADE2', COUNT(*) FROM classes_schema."GRADE2"
UNION ALL
SELECT 'GRADE3', COUNT(*) FROM classes_schema."GRADE3"
UNION ALL
SELECT 'GRADE4A', COUNT(*) FROM classes_schema."GRADE4A"
UNION ALL
SELECT 'GRADE4B', COUNT(*) FROM classes_schema."GRADE4B"
UNION ALL
SELECT 'GRADE5', COUNT(*) FROM classes_schema."GRADE5"
UNION ALL
SELECT 'GRADE6', COUNT(*) FROM classes_schema."GRADE6";

-- Total
SELECT SUM(students) as total_students FROM (
  SELECT COUNT(*) as students FROM classes_schema."GRADE10"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE11"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE12"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE7"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE8"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE9"
  UNION ALL SELECT COUNT(*) FROM classes_schema."KG1A"
  UNION ALL SELECT COUNT(*) FROM classes_schema."KG1B"
  UNION ALL SELECT COUNT(*) FROM classes_schema."KG2A"
  UNION ALL SELECT COUNT(*) FROM classes_schema."KG2B"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE1A"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE1B"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE2"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE3"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE4A"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE4B"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE5"
  UNION ALL SELECT COUNT(*) FROM classes_schema."GRADE6"
) as counts;

-- Check classes table
SELECT COUNT(*) as total_classes FROM school_schema_points.classes;
