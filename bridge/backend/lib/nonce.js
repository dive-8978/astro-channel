const usedNonces = new Set();
module.exports = {
  check(nonce){
    if(usedNonces.has(nonce)) return false;
    usedNonces.add(nonce);
    return true;
  }
}
