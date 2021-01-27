const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('User', {
    email: String,
    password: String,
    token: String,
});

module.exports = {

User,
}