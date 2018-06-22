const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');
const configa = require("../config/agreementDB");


// Agreement Schema
const AgreementTemplateSchema = mongoose.Schema({
  templateType: {
    type: String,
    required: true
  },
  serviceProvider: {
    type: String,
    required: true
  },
  serviceConsumer: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  }
});
const AgreementTemplate = module.exports = mongoose.model('Agreement', AgreementTemplateSchema);

//const AgreementTemplate = module.exports = mongoose.model('AgreementTemplate', AgreementTemplateSchema);
module.exports.getagreementByType = function(templateType, callback){
  const query = {templateType: templateType};
  AgreementTemplate.findOne(query, callback);
}

module.exports.addAgreement = function(newAgreement, callback) {
  newAgreement.save(callback);
}
