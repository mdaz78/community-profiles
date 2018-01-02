var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VentureSchema = new Schema({
  name: { type: String, required: true },
  problemStatement: { type: String },
  mvp: { type: String },
  team: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  admin: { type: Boolean, default: false },
  phone: { type: String },
  slug: { type: String },
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  about: { type: String },
  logo: { type: String, default: '/images/venture.svg' },
  dateAdded: { type: 'Date', default: Date.now },
});

module.exports = mongoose.model('Venture', VentureSchema);