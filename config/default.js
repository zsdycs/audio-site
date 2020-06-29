module.exports = {
    port: 2333,
    session: {
      secret: 'audiosite',
      key: 'audiosite',
      maxAge: 2592000000
    },
    // mongodb 连接
    mongodb: 'mongodb://localhost:27017/gp_db'
  }