const db = require('../data/dbConfig');

module.exports = {
    getAll,
    getByID,
    addProfile,
    findBy,
    isValid
}

function getAll(){
    return db('profiles').select('id','username','department');
}

function findBy(filter){
    return db('profiles').where(filter);
}

async function addProfile(newUser){
    try{
        const [id] = await db('profiles').insert(newUser, 'id');
        return getByID(id);
    }catch(err){
        throw err.message;
    }
}

function getByID(id){
    return db('profiles').where({id});
}

function isValid(credentials){
    return Boolean(credentials.username && credentials.password && typeof credentials.password === 'string');
}