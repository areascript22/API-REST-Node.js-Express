//Todas las consultas y sentencias sql
const { callbackify } = require('util');
const db = require('../config/config.js');
const crypto = require('crypto');

const User = {
};

User.getAll = ()=> {
    const sql = 'select * from users';
    return db.manyOrNone(sql);
};

User.delete = async (id) =>{
    const sql = 'delete  from users where id = $1 ';
    const result = await db.result(sql,[id]);
    return result.rowCount>0;
}

User.update = async(id,newUser)=>{
    const sql = ` update users set 
         name=$1, lastname=$2,email = $3, phone=$4, image=$5,  
         password=$6, is_available =$7, session_token=$8, created_at =$9, updated_at=$10
         where id = $11
         returning *`;
    return  db.oneOrNone(sql,[
        newUser.name,
        newUser.lastname,
        newUser.email,
        newUser.phone,
        newUser.image,
        newUser.password,
        newUser.is_available,
        newUser.session_token,
        new Date(),
        new Date(),
        id
    ]);

}

User.create=(user)=>{
    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex'); //Encriptar contrase;a
    user.password  = myPasswordHashed;

    const sql =` INSERT INTO public.users(
         email, name, lastname, image, phone, password, is_available, session_token, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)  returning id`;
    return db.oneOrNone(sql,[
        user.email,
        user.name,
        user.lastname,
        user.image,
        user.phone,
        user.password,
        user.is_available,
        user.session_token,
        new Date(),
        new Date()
    ]);
};

//Verificamos si la contrase;a ingresada es correcta (encriptacion)
User.isPasswordMatched = (password,hash)=>{
    const myPasswordHashed = crypto.createHash('md5').update(password).digest('hex');
    if(myPasswordHashed === hash ) {
        return true;
    }else {
        return false;
    }
}

module.exports  =User;