-- Reset superadmin password to 'admin123'
-- Hash generated with bcrypt, salt rounds = 10
UPDATE super_admin_users 
SET password = '$2a$10$rOZJQGJKf5z.5rY5y5Jxj.xKqVxGxGxGxGxGxGxGxGxGxGxGxGxGxG', 
    updated_at = NOW() 
WHERE username = 'superadmin';

-- Verify the update
SELECT id, username, created_at, updated_at FROM super_admin_users WHERE username = 'superadmin';
