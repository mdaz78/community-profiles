var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SkillSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  slug: { type: String },
  mvp: { type: String },
  users: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  logo: { type: String, default: '/images/skill.svg' },
});


module.exports = mongoose.model('Skill', SkillSchema);