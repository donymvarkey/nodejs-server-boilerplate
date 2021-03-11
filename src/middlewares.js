const jwt = require('jsonwebtoken');
const defaults = require('./defaults');
module.exports = {
    allowCrossDomain : function(req,res,next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, x-auth-token, X-Requested-With, Content-Type'
        );

        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
            //res.sendStatus(200);
            next();
        } else {
            next();
        }
    },

    isAuthorised : function(req,res,next){
        var verificationHeader = req.headers['x-auth-token'];
        var verify;

        if(verificationHeader === undefined || verificationHeader === null || verificationHeader === ''){
            res.status(401).json({
                status : false,
                msg : 'auth error'
            });
            return;
        }
        
        try{
            
            verify = jwt.verify(verificationHeader, process.env.SIGNATURE);
            req.user = verify;

            next();
        }
        catch(e){
            
            res.status(401).json({
                status : false,
                msg : 'auth error'
            });
        }
    }
}