const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config')

//generate a token for user to use on authenticated routes
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {

  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(422).send({error: 'you must enter an email and password'})
    }

    //does given email exist
    User.findOne({
        email: email
    }, function(err, existingUser) {
        if (err) {
            return next(err);
        }
        // if user does already exist return an error
        if (existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }
        // if user does not exist save new user record
        const user = new User({email: email, password: password});

        user.save(function(err) {
            if (err) {
                return next(err, 'asdfasdfasdf');
            }

            res.json({token: tokenForUser(user)})
        })

    });

}
