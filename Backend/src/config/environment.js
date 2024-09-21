const dotenv = require('dotenv');
const path = require('path');

class Environment {
  constructor(envFilePath = '.env') {
    const envPath = path.resolve(process.cwd(), envFilePath);
    const result = dotenv.config({ path: envPath });

    if (result.error) {
      throw result.error;
    }

    console.log(`Environment variables loaded from ${envFilePath}`);
  }

  get(key) {
    return process.env[key];
  }
}

module.exports = Environment;
