const fs = require('fs');

let rawData = fs.readFileSync('d-4/input.txt', { encoding: 'utf-8' });

let passports = rawData.split('\n\n');

let requiredFields = ['byr:', 'iyr:', 'eyr:', 'hgt:', 'hcl:', 'ecl:', 'pid:'];

let validCount = 0;

for (passport of passports) {
  let valid = true;
  for (field of requiredFields) {
    if (!passport.includes(field)) {
      valid = false;
      break;
    }
  }
  valid ? validCount++ : null;
}

console.log(validCount);
