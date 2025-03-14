const { connectToMongo } = require('./db');



const logger = (req, res, next) => {
    const header=req.headers['authorization'];
    if(  header !== "Bearer ZEWAIL"){
        return res.status(403).send("Unauthorized");
    }
    else {
        console.log("Authorized");
    }
    next();
}


module.exports = {
    logger
}