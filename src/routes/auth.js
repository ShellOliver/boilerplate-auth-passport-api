import express from 'express';
import passportGoogle from 'auth/google';
const router = express.Router();

router.get('/login', (req, res) => {
	res.render('login');
});

router.get('/google',
  passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passportGoogle.authenticate('google', { failureRedirect: '/auth/login' }),
  function(req, res) {
    res.redirect('/users');
  });

module.exports = router;