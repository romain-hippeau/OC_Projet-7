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
exports.deleteComment = (req, res) => {
  let commentId = req.params.id
  let userIdForDelete = req.userId

  User.findOne({
    where: {id: userIdForDelete},
    include:[
      {
        model: Role
      }
    ]
  })
  .then(user =>{
    let userForDeleteRole = user.roles[0].name;
    Commentaire.findOne({
      where: {id: commentId}
    })
    .then(comment =>{
      if (comment.userId === userIdForDelete || userForDeleteRole === "admin"){
        Commentaire.destroy({
          where: {id:commentId}
        })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "le commentaire a bien été supprimé!"
            });
          } else {
            res.send({
              message: `le commentaire n'as pas été trouvé!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "le commentaire n'as pas été trouvé avec son id=" + id
          });
        });
      }
    })
    .catch(err=>{
      res.status(500).send({
        message: "commentaire non trouvé"
      })
    })
  })
  .catch(err =>{
    res.status(400).send({
      message: "utilisateur non trouvé"
    })
  })
}

