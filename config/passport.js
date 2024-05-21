//Crear JWT
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.js');
const Keys = require('./keys.js');

module.exports = function(passport){
    let opt = {};
    opt.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opt.secretOrKey = Keys.secretOrKey;
    passport.use(new JwtStrategy(opt,(jwt_payload, done)=>{
        User.findById(jwt_payload.id, (err, user)=>{
           
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user); 
            }else{
                return done(null,false);
            }
        })
    } ));
}
