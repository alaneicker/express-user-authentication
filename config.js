const generateTokenSignature = () => {
  var signature = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++) {
    signature += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return signature;
}

module.exports = {
  'jwtSignature': generateTokenSignature()
};