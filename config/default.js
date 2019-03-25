module.exports = {
    port: 80,
    session: {
      secret: 'audiosite',
      key: 'audiosite',
      maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/gp_db'
  }