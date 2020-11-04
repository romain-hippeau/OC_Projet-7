//Importation des middleware pour verifier les roles et le token
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    //route pour l'accés a tout utilisateur
    app.get("/api/test/all", controller.allAccess);

    //route pour l'accés des utilisateur
    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    //route qui donne l'accès aux administrateurs
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
     );
};