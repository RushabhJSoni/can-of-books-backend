const jwt = require('jsonwebtoken'); // auth
const jwksClient = require('jwks-rsa'); // auth


const client = jwksClient({
 jwksUri: process.env.JWKS_URI
});

// this function comes directly from the jsonwebtoken docs
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
  const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function verifyUser(request, errOrUserCallback) {

  try {
    const token = request.headers.authorization.split(' ')[1];
    console.log(token);
    jwt.verify(token, getKey, {}, errOrUserCallback);
  } catch (error) {
    errOrUserCallback('Not Authorized');
  }
}

module.exports = verifyUser;