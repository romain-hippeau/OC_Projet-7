const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
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
                message: "Vous ne pouvais effectuer cette action"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
//mise en place pour verifier si l'utilisateur est administrateur
isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                return;
                }
            }
            res.status(403).send({
                message: "Vous ne pouvez pas faire cette action, elle requiert un rôle administrateur"
            });
            return;
        });
    });
};
const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};
module.exports = authJwt;