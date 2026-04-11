UPDATE branches SET status = 'inactive' WHERE code IN ('IQRAB1', 'IQRAB2');
UPDATE branches SET base_url = 'http://localhost:5000' WHERE code = 'IQRAB3';
SELECT id, name, code, base_url, status FROM branches ORDER BY id;
