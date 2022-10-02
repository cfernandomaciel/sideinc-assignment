const auth = require('../utils/auth');

const jwt = auth.generateToken();
console.log({ jwtToken: jwt });