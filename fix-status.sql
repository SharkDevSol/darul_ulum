BEGIN;
UPDATE branches SET status = 'inactive' WHERE code = 'IQRAB1';
UPDATE branches SET status = 'inactive' WHERE code = 'IQRAB2';
COMMIT;
SELECT id, name, code, status FROM branches ORDER BY id;
