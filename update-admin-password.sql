-- Update superadmin password to 'admin123'
-- Pre-generated bcrypt hash for 'admin123' with salt rounds = 10
UPDATE super_admin_users 
SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 
    updated_at = NOW() 
WHERE username = 'superadmin';

-- Verify the update
SELECT id, username, created_at, updated_at FROM super_admin_users WHERE username = 'superadmin';
