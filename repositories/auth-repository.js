const mongoose = require('mongoose')

const User = require('../models/user')

exports.create = async (user) => {
    await User.create(user);
}
