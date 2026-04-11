// Reset admin password
import bcrypt from 'bcryptjs';

const password = 'admin123';
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

console.log('Hashed password for admin123:');
console.log(hashedPassword);
console.log('\nSQL command to update:');
console.log(`UPDATE super_admin_users SET password = '${hashedPassword}' WHERE username = 'superadmin';`);
