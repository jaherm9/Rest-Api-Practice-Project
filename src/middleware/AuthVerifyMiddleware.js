let jwt = require('jsonwebtoken');


module.exports = (req, res, next) =>{
    let Token = req.headers['token-key']

    jwt.verify(Token, "SecretKey68669", function (err, decoded){
        if(err){
            res.status(401).json({status: "Unauthorized"})
        }
        else{
            // Get User Name From Decodded Token & Add with Req Header
            let username = decoded['data']['userName'];
            req.headers.username=username;

            next();
        }
    })
}