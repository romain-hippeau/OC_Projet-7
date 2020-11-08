const db = require('../models');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;
 
const Op = db.Sequelize.Op;
 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
 
exports.signup = (req, res) => {
    console.log(req.body);
    const firstname = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

  // Sauvegarde de l'utilisateur dans la base de données 
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send("l'utilisateur a étais enregistré");
        });
      });
    } else {
      // user role = 1
      user.setRoles([1]).then(() => {
        res.send("l'utilisateur a étais enregistré");
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  }); 
};
 
exports.signin = (req, res) => {
    User.findOne({
      where: {
          email: req.body.email
      }
  })
  .then(user => {
      //puis si il n'y a pas de correspondance alors on envoit une erreur
      if (!user) {
          return res.status(404).send({ message: "L'email n'a pas été trouvé." });
      }
      //on compare les données avec bcrypt
      let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
      );
      //si il n'est pas valide, on ne génère pas de token et on renvoie l'erreur mot de passe 
      if (!passwordIsValid) {
          return res.status(401).send({
          accessToken: null,
          message: "merci de saisir le bon mot de passe"
          });
      }
      //Si tout est bon , nous envoyons la signature du token
      let token = jwt.sign(
          { id: user.id }, 
          config.secret, 
          {expiresIn: 25200} // valable 7 heures
      );

      //On vient rechercher le rôle de l'utilisateur
      let authorities = [];
      user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
              }
          //On renvoie une réponse de statut200 avec l'ensemble des éléments liés à l'utilisateur dans un objet. 
          res.status(200).send({
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              roles: authorities,
              accessToken: token
          });
      });
    })
    .catch(err => {
    res.status(500).send({ message: err.message });
    });   
};
exports.delete = (req,res)=>{
  const id = req.params.id
  User.findOne({
    where: {
      id:id
    }
  })
  .then(user =>{
    console.log(user)
    if (!user) {
      return res.status(404).send({ message: "L'utilisateur  n'a pas été trouvé." });
    }
    else{
      User.destroy({
        where: {id:id}
      })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "l'utilisateur a été supprimé avec succés"
          });
        } else {
          res.send({
            message: `impossible de supprimer l'utilisateur avec son id `
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "impossible de supprimer l'utilisateur avec son id" + id
        });
      });
    }
  })
}