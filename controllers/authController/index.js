const User = require('../../models/user')
const Utils = require('../../utils/utils')
const jwt = require('jsonwebtoken')

const authRepository = require('../../repositories/auth-repository');

exports.register = async (req, res, next) => {

    const { email, password, confirmpassword } = req.body;

    if (!email) {
        return res.status(422).json({ msg: "Email is required" });
    }

    if (!password) {
        return res.status(422).json({ msg: "Password is required" });
    }

    if (password != confirmpassword) {
        return res
        .status(422)
        .json({ msg: "Password must be equals at confirm pass" });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
        return res.status(422).json({ msg: "E-mail already in use" });
    }

    const pass = await Utils.createPassCrypt(password)

    try {

        authRepository.create(new User({
            email,
            pass,
        }));

        res.status(201).json({ msg: "User created with sucessfully" });
    } catch (error) {
        res.status(500).json({ msg: error });
    }

};


exports.login = async (req, res, next) => {

    const { email, password } = req.body;


    if (!email) {
        return res.status(422).json({ msg: "mail is required" });
    }

    if (!password) {
        return res.status(422).json({ msg: "password is required" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }
    
    const checkPassword = await Utils.comparePassCrypt(password, user.pass)

    if (!checkPassword) {
        return res.status(422).json({ msg: "Invalid password" });
    }

    try {
        const secret = process.env.SECRET;

        console.log(user._id)

        const token = jwt.sign(
        {
            id: user._id,
        },
        secret
        );

        console.log(user._id)

        res.status(200).json({ msg: "Sucess", token });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};