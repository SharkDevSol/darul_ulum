-- Check class schemas for student data
SELECT 'classes_schema' as schema_name, COUNT(*) as table_count 
FROM information_schema.tables 
WHERE table_schema = 'classes_schema';

-- Check school_schema_points
SELECT 'school_schema_points' as schema_name, COUNT(*) as table_count 
FROM information_schema.tables 
WHERE table_schema = 'school_schema_points';

-- List tables in classes_schema
\dt classes_schema.*

-- Check if there's a classes table with data
SELECT tablename FROM pg_tables WHERE schemaname = 'school_schema_points';
