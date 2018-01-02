var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SprintSchema = new Schema({
  description: { type: String, required: true },
  sprintHead: { type: Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  category: { type: Schema.Types.ObjectId, ref: 'Skill' },
  dateTime: { type: Date },
  dateAdded: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Sprint', SprintSchema);