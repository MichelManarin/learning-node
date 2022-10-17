const mongoose = require('mongoose')

const Person = require('../models/person')

exports.list = async () => {
    const res = await Person.find();
    return res;
};

exports.getById = async (id) => {
    const res = await Person.findOne({ _id: id })
    return res;
}

exports.create = async (person) => {
    await Person.create(person);
}

exports.update = async (person, id) => {
    return await Person.updateOne({ _id: id }, person);
}

exports.delete = async (id) => {
    await Person.deleteOne({ _id: id });
}