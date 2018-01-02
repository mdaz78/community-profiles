var cloudinary = require('cloudinary');
var config = require('../config');
cloudinary.config(config.cloudinary);

module.exports = {

  uploadImage: function(data, cb) {
    cloudinary.uploader.upload(data, function(result) { 
      var imageUrl = result['secure_url'];
      cb(imageUrl);
    });
  }

}
