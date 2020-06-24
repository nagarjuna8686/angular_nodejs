const Jwt = require("jsonwebtoken");

  module.exports =  function (req,res,next){
    const token=req.header('auth-token');
    if(!token) return res.status(400).send("Access Denined");
    try{
       const verified = Jwt.verify(token, process.env.TOKEN_SCERET);
       req.user=verified;
       next();
    }catch(err){
     res.status(400).send("Invalid Token");
    }
}
