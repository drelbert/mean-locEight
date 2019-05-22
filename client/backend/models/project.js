const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  lead: { type: String, required: true },
  dateDue: { type: Date, required: true }
});

module.exports = mongoose.model('Project', projectSchema);


//May need this ,
 // _id: { type: String, required: true }
