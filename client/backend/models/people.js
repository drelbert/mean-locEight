// With this import, a schema is created
const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
  //Building up the schema, see 'Schema' on mongoose site/schema types
  name: { type: String, required: true },
  role: { type: String, required: true }
});

//Need to add the model after the schema
//Turn the definition above into a model

module.exports = mongoose.model('People', peopleSchema);

