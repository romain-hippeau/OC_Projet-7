const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
//implementation de la verification du token
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "Aucun token n'est renseigné"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Vous ne pouvais pas effectuer cette action"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
const authJwt = {
    verifyToken: verifyToken,
};
module.exports = authJwt;