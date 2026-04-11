-- Check public schema
SELECT 'public.students' as table_name, COUNT(*) as count FROM public.students WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='students');
SELECT 'public.classes' as table_name, COUNT(*) as count FROM public.classes WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='classes');
SELECT 'public.staff' as table_name, COUNT(*) as count FROM public.staff WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='staff');

-- Check school_comms schema
SELECT 'school_comms.Student' as table_name, COUNT(*) as count FROM school_comms."Student";
SELECT 'school_comms.Class' as table_name, COUNT(*) as count FROM school_comms."Class";
SELECT 'school_comms.User' as table_name, COUNT(*) as count FROM school_comms."User";

-- List all tables with row counts
SELECT schemaname, tablename 
FROM pg_tables 
WHERE schemaname IN ('public', 'school_comms') 
ORDER BY schemaname, tablename;
