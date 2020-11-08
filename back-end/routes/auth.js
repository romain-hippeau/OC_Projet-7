
const { verifySignUp } = require("../middleware");
//le controllers serviras pour l'inscription et pour se connecter
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    //la route pour l'inscription
    app.post( "/api/auth/signup", 
        [
            verifySignUp.checkDuplicateEmail,//regarde si l'utilisateur est deja inscrit
            verifySignUp.checkRolesExisted //regarde le role de l'utilisateur
        ],
        controller.signup //permettras l'incription de l'utilisateur
    );
    //la route pour se connecter
    app.post("/api/auth/signin", controller.signin);//verifie l'utilsateur et son mot de passe

    app.delete("/api/auth/:id", controller.delete)//route pour supprimer l'utilisateur
};