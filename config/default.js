module.exports = {
  port: 2333,
  session: {
    secret: 'audiosite',
    key: 'audiosite',
    maxAge: 3600 // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  // mongodb 连接
  mongodb: 'mongodb://localhost:27017/audio-site'
}