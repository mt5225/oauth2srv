var users = [];


exports.find = function(id, done) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.id === id) {
      return done(null, user);
    }
  }
  return done(null, null);
};

exports.findByUsername = function(username, done) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return done(null, user);
    }
  }
  return done(null, null);
};

exports.findByReq = function(req, done) {
  user = {};
  user.id = req.param('openid');
  user.username = req.param('nickname');
  user.password = req.param('openid');
  user.name = req.param('nickname');
  user.avatar = req.param('avatar');
  console.log(user);
  users.push(user);
  return done(null, user);
};
