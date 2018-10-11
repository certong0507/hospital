const userCtrl = require('../controllers/user.ctrl');

module.exports = (router) => {

   // Log in user. (for admin and patient)
   // Params: Username and password.
   router
      .route('/user/:username/:password')
      .get(userCtrl.getUser);
}