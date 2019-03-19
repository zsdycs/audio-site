module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', { title: 'Audiosite' });
  })
  app.use('/cart', require('./cart'))
  app.use('/order', require('./order'))
  // app.use('/signin', require('./signin'))
  // app.use('/signout', require('./signout'))

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}

