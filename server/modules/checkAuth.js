module.exports = {

  isAdmin: function (req, res, next) {
    if(req.user && req.user.admin) {
      return next();
    }

    return res.status(403).send({message: 'Not authorized'});
  },

  isUser: function (req, res, next) {
    if(req.user) {
      return next();
    }

    return res.status(403).send({ message: 'Not authorized' });
  },
}