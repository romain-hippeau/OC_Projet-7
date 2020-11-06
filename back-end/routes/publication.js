
const { authJwt } = require("../middleware");

module.exports = app => {
    const publications = require("../controllers/publications.ctrl");
    const multer = require('../middleware/multer-config');
  
    var router = require("express").Router();
  
    // Route qui sert a créer une nouvelle publication
    router.post("/", multer, publications.create);
  
    // Route qui sert a récupérer toutes les publications
    router.get("/", publications.findAll);
  
    // Route qui sert a récupérer une publication par son identifiant
    router.get("/:id", publications.findOne);
  
    // Route qui sert supprime une publication
    router.delete("/:id", [authJwt.verifyToken], publications.delete);
  
  
    app.use('/api/publications', router);
};