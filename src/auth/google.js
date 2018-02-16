import passport from 'passport';
import jwt from 'jsonwebtoken';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://${process.env.HOST}:${process.env.PORT}/auth/google/callback`//try pass jwt via get
    //and validate via at custom middleware of this route
  },
  function(accessToken, refreshToken, profile, done) {
  		//console.log(profile);//if this is on database or anyware that can valid it, then generate 
  		//a jwt for send to the client.
  		let token = jwt.sign({
  			usr_id: profile.id,
  			usr_email: profile.emails[0], 
  			usr_name: profile.displayName
  		}, process.env.JWT_SECRET);
  		console.log(token);
      return done(null, null);//save what you want on session, or save nothing on session ;)
  }
));

export default passport;