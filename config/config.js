const promise = require('bluebird');
const options = {
    promiseLib:promise,
    query:(e)=>{}
};

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114,function(stringValue){
    return stringValue;
} );

//PROPORCIONA TUS PROPIAS CREDENCIALES
const databaseConfig ={
    'host': '127.0.0.1',
    'port':5432,
    'database':'postgres',
    'user':'postgres',
    'password':'admin'
};

const db = pgp(databaseConfig);
module.exports = db;