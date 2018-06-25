const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    RoleName: String,
    Description: String,
    Pages:[]
}, { collection: 'role' });

const Role = module.exports = mongoose.model('Role', roleSchema);

