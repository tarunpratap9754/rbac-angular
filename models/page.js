const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
    pagename: String,
    description: String,
}, { collection: 'page' });

const Page = module.exports = mongoose.model('Page', pageSchema);
