var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
    var birthYear = this.date_of_birth ? this.date_of_birth.getFullYear() : '';
    var deathYear = this.date_of_death ? this.date_of_death.getFullYear() : '';
    var lifespan = birthYear + ' - ' + (deathYear || '');
    return lifespan;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
