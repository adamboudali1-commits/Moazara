const bcrypt = require('bcrypt');

async function hash() {
  const password = 'admin123';       // Mot de passe actuel à hasher
  const saltRounds = 10;             // Complexité du hashage (10 est un bon compromis)
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(hash);
}

hash();
