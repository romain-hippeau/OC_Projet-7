const { authJwt } = require("../middleware");

module.exports = app => {
    const commentaires = require("../controllers/commentaire.ctrl");
  
    var router = require("express").Router();
  
    // route qui permet la creation d'un nouveau commentaire
    router.post("/", commentaires.createComment);
   // Route qui permet de supprimer un commentaire

   router.delete("/:id", [authJwt.verifyToken], commentaires.deleteComment);
    
   app.use('/api/commentaires', router);
};