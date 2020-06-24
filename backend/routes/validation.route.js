const Joi=require('@hapi/joi');

const validatationUser = data =>{
    const schema = Joi.object( {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const validatationLogin = data =>{
    const schema = Joi.object( {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

module.exports.validatationUser = validatationUser;
module.exports.validatationLogin = validatationLogin;