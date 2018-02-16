import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', logged, function(req, res, next) {
  res.send('respond with a resource');
});

function logged(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
}

module.exports = router;
