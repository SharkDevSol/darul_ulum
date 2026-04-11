SELECT COUNT(*) as total_staff FROM public.staff_users;
SELECT COUNT(*) as active_staff FROM public.staff_users WHERE is_active = true;
SELECT COUNT(*) as inactive_staff FROM public.staff_users WHERE is_active = false;
SELECT is_active, COUNT(*) FROM public.staff_users GROUP BY is_active;
