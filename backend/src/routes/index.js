const routes = require('./apis');

const constructorMethod = (app) => {
  app.use('/.netlify/functions/api', routes);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;