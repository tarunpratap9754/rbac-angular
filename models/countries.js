const mongoose = require('mongoose');

const countriesSchema = mongoose.Schema({
    CountryName: String,
    States: [{
        StateName: String,
        Cities: [{
            type: String
        }]
    }]
}, { collection: 'countries' });

const Countries = module.exports = mongoose.model('Countries', countriesSchema);

