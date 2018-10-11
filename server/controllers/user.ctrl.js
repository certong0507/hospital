const User = require('../models/User');

module.exports = {
   getUser: (req, res, next) => {
      User.find(
         {username: req.params.username, password: req.params.password}
      ).exec(
         function(err, list){
            if (err) 
               res.send(err);
            else
               res.send(list);
            next();
         }
      )
   }
}