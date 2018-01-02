var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  slackUserId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  admin: { type: Boolean, default: false },
  role: { type: String },
  onboardingDone: { type: Boolean, default: false },
  ventures: [{ type : Schema.Types.ObjectId, ref: 'Venture' }],
  skills: [{ type : Schema.Types.ObjectId, ref: 'Skill' }],
  phone: { type: String },
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  about: { type: String },
  image: { type: String, default: '/images/user.svg' },
  dateAdded: { type: 'Date', default: Date.now },
});


module.exports = mongoose.model('User', UserSchema);