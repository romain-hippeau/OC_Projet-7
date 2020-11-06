const db = require('../models');
const { publication } = require('../models');
const Commentaire = db.comments;
const Role = db.role;
const User = db.user;
// parametre pour creer un commentaire
exports.createComment = (req,res)=>{
  const {userId, publicationId, text} = req.body
  if (userId && publicationId && text){
    Commentaire.create({
      text:text,
      publicationId:publicationId,
      userId:userId
    })  
    .then((data) => {
      res.status(201).json(data)  
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  }
}
//parametre de suppression