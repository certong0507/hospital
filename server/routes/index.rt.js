const user = require('./user.rt');
const letter = require('./letter.rt')

module.exports = (router) => {
   user(router);
   letter(router);
}