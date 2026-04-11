-- Update branch URLs to use localhost backend ports
UPDATE branches SET base_url = 'http://localhost:5000', status = 'active' WHERE code = 'IQRAB3';
UPDATE branches SET status = 'inactive' WHERE code IN ('IQRAB1', 'IQRAB2');

-- Verify the changes
SELECT id, name, code, base_url, status FROM branches;
