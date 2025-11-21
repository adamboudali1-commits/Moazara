const bcrypt = require('bcrypt');

async function generateHash(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(hash);
}

generateHash('password123');  // Remplace ici par le mot de passe que tu veux hasher
    