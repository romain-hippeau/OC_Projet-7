const { authJwt } = require("../middleware");

module.exports = app => {
    const commentaires = require("../controllers/commentaire.ctrl");
  
    var router = require("express").Router();
  
    // route qui permet la creation d'un nouveau commentaire
    router.post("/", commentaires.createComment);
  
    app.use('/api/commentaires', router);
};