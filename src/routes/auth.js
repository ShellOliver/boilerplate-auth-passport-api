import express from 'express';
import localJwt from 'auth/local';
import jwt from 'jsonwebtoken';
import middlewareJwt from 'middleware/jwtMiddleware';

import { plus, oauth2Client } from 'auth/google-jwt';

/**end google settings */

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'online', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/plus.me' // can be a space-delimited string or an array of scopes
  });

  res.redirect(url);
});

router.get('/google/callback',
  function (req, res) {
    oauth2Client.getToken(req.query.code, (err, tokens) => {//get the code and transform in token
      if (err) throw err;
      oauth2Client.setCredentials(tokens);//set this to some kind of session to check future token
      
      plus.people.get({ userId: 'me', auth: oauth2Client }, (err, profile) => {//use this to deserialize the user
        if (err) throw err;
        console.log(profile.data);
        let token = jwt.sign({ usr: profile.id }, process.env.JWT_SECRET);
        return res.json({ token }); //send token to the user
      });
    });
  });

router.post('/local', (req, res) => {
  if (req.body.user == 'shell' && req.body.password == '123') {
    let usr = req.body.user;//find this somewhere and do something
    let token = jwt.sign(usr, process.env.JWT_SECRET);
    return res.json({ token });
  }
});

router.get('/ok-token', middlewareJwt, (req, res) => {
  return res.json({ tokenValid: true });
});

module.exports = router;