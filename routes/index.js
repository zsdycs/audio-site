module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', { title: '你来啦！' });
  })
  app.use('/cart', require('./cart'))
  app.use('/order', require('./order'))
  app.use('/signin', require('./signin'))
  app.use('/signup', require('./signup'))
  app.use('/signout', require('./signout'))
  app.use('/favorite', require('./favorite'))

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}

