const personRepository = require('../../repositories/person-repository');

exports.get = async (req, res, next) => {

    try{
        const people = await personRepository.list();

        res.status(200).json(people);

    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: error})
    }

};


exports.getById = async (req, res, next) => {

    try{
        const id = req.params.id

        const person = await personRepository.getById(id);

        if (!person) {
            res.status(422).json({ message: 'Person not found' })
            return
        }

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({ erro: error })
    }
};


exports.post = async (req, res, next) => {

    const {name, salary, approved } = req.body

    if(!name){
       return res.status(422).json({error: 'Name is required!'})
    }
    
    try{

        await personRepository.create({
            name,
            salary,
            approved
        });

    } catch (error) {
        res.status(500).json({ erro: error })
    }
    res.status(201).send('Person created with sucessfully');
};


exports.put = (req, res, next) => {

    const id = req.params.id;

    const { name, salary, approved } = req.body

    const updatedPerson = personRepository.update({
        name,
        salary,
        approved,
    }, id);

    if (updatedPerson.matchedCount === 0) {
        res.status(422).json({ message: 'User Not Found' })
        return;
    }

    res.status(200).json(person)
};

exports.delete = async (req, res, next) => {

    const id = req.params.id

    const person = await personRepository.getById(id);

    if (person){
        personRepository.delete(id);
    } else {
        res.status(404).json({ erro: "Person Not Found" });
        return;
    }

    res.status(200).json({ message: 'Person removed with sucessfully!' });
};