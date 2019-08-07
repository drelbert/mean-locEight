const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  lead: { type: String, required: true },
  dueOn: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model('Projects', projectSchema);


//May need this ,
 // _id: { type: String, required: true }
