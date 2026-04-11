-- Check public schema tables that might have data
SELECT 'admin_users' as table_name, COUNT(*) as count FROM public.admin_users;
SELECT 'staff_users' as table_name, COUNT(*) as count FROM public.staff_users;
SELECT 'evaluations' as table_name, COUNT(*) as count FROM public.evaluations;
SELECT 'expenses' as table_name, COUNT(*) as count FROM public.expenses;
SELECT 'fee_payments' as table_name, COUNT(*) as count FROM public.fee_payments;

-- Check if there's student data in other schemas
SELECT schemaname, tablename, n_live_tup as row_count
FROM pg_stat_user_tables 
WHERE n_live_tup > 0 
  AND (tablename ILIKE '%student%' OR tablename ILIKE '%class%' OR tablename ILIKE '%staff%')
ORDER BY n_live_tup DESC
LIMIT 20;
