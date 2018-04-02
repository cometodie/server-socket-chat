const jwt = require('jsonwebtoken');

module.exports = (app, express) => {
  const bodyParser = require('body-parser');
  const user = require('../routes/user.route');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });
  app.use(verifyUser);
  app.use('/user', user);
};

verifyUser = (req, res, next) => {
  if (req.path !== '/user/signin' || req.path !== '/user/signup') {
    return next();
  } else {
    const token = req.headers.authorization.split(' ')[1];
    console.log(jwt.decode(token));
    jwt.verify(token, 'secret', err => {
      if (err) {
        res.send(401);
      } else {
        return next();
      }
    });
  }
};
