// backend/routes/api/index.js
const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');




// CSRF restore route
router.get('/csrf/restore', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.status(200).json({});
});

// Test route
// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
  });

  router.use(restoreUser);
  router.use('/session', sessionRouter);
 router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


  router.get('/restore-user', (req, res) => {
    return res.json(req.user);
  });

  router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user);
  });

  module.exports = router;
