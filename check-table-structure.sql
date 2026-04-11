-- Check GRADE10 structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'classes_schema' 
  AND table_name = 'GRADE10'
ORDER BY ordinal_position;

-- Check staff_users structure  
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'staff_users'
ORDER BY ordinal_position;
