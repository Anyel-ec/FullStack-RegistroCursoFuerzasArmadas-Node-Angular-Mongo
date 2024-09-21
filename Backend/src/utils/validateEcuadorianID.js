function validateEcuadorianID(id) {
    // Check if the ID has 10 digits
    if (id.length !== 10) return false;
    const digits = id.split('').map(Number);
    const province = digits[0] * 10 + digits[1];
    // Check if the province is valid (1-24) 
    if (province < 1 || province > 24) return false;
    // Check if the third digit is valid
    if (digits[2] > 6) return false;
  
    // Calculate the verifier digit
    const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const sum = digits.slice(0, 9).reduce((acc, digit, idx) => {
      let result = digit * coefficients[idx];
      if (result > 9) result -= 9;
      return acc + result;
    }, 0);
    // Check if the verifier digit is valid
    const verifier = sum % 10 === 0 ? 0 : 10 - (sum % 10);
    // Return true if the verifier digit is valid
    return verifier === digits[9];
  }
  
  module.exports = validateEcuadorianID;