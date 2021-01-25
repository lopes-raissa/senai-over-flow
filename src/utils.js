const jwt = require("jsonwebtoken");
const auth = require("./config/auth.json");

const generateToken = (payload) => {
    jwt.sign(payload, auth.secret, {
        expiresIn: "1h"
    });
};

module.exports = { generateToken };

