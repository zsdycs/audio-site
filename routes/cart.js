var router = require('express').Router();
var checkLogin = require('../middlewares/checkForAjax').checkLogin


/* GET */
router.get('/', function(req, res, next) {
  res.render('cart', { title: '购物车' });
})
// post,结算
router.post('/',checkLogin, function(req, res, next) {
  console.log(req.body);
  res.send({"status":true});
});

module.exports = router
