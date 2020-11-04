const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  
    // Email
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Erreur, ce mail est déjà utilisé, merci d'en choisir un autre"
            });
            return;
        }
        next();
    });
};
const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
};
  
module.exports = verifySignUp;