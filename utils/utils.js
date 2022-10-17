const bcrypt = require('bcrypt')

exports.createPassCrypt = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash.toString();
}

exports.comparePassCrypt = async (password, passHash) => {
    return await bcrypt.compare(password, passHash);
}

