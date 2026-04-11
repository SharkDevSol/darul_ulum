BEGIN;
UPDATE branches SET status = 'inactive' WHERE id IN (1, 2);
COMMIT;
SELECT id, name, code, status FROM branches ORDER BY id;
