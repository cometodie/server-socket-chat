const jwt = require('jsonwebtoken');
const routes = require("../routes");

module.exports = app => {
  const bodyParser = require('body-parser');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });
  app.use(verifyUser);
  app.use('/users/', routes.userRoutes);
  app.use('/api/', routes.postRoutes);
  app.use('/api/', routes.chatRoutes);
};

verifyUser = (req, res, next) => {
  if (req.path === '/users/signin' || req.path === '/users/signup') {
    return next();
  } else {
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, 'secret', err => {
        if (err) {
          res.sendStatus(401);
        } else {
          return next();
        }
      });
    } catch (error) {
      res.sendStatus(401);
    }
  }
};
