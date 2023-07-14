const routes = require('./apis');

const constructorMethod = (app) => {
  app.use('/', routes);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;