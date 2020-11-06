const db = require("../models");
const Role = db.role;
const User = db.user;
const Publication = db.publication;
const Comment = db.comments
const Op = db.Sequelize.Op;

// enregistrement et création d'une nouvelle publications
exports.create = (req, res) => {
    const id = req.body.id
    let attachmentURL
    User.findOne({
        attributes: ['id', 'email', 'firstname', 'lastname'],
        where: { id: id }

    })
        .then(user => {
            if (user !== null) {
                let title = req.body.title;
                
                if (req.file != undefined) {
                    attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    
                }
                else {
                    attachmentURL == null
                }
                if (title !== 'null' && attachmentURL !== null) {
                    console.log(attachmentURL)
                    console.log(title)
                    const publication = {
                        title: title,
                        attachment: attachmentURL,
                        userId: id
                    }
                    console.log(publication);

                    Publication.create(publication)
                        .then((data) => {
                            res.status(201).json(data)
                            
                        })
                        .catch((err) => {
                            res.status(500).json(err)
                        })
                };
            } else {
                res.status(400).json(error);
            }
        })
        .catch(error => res.status(500).json(error));
    
};
// parametre pour avoir toutes les publications
exports.findAll = (req, res) => {
    
    Publication.findAll({
        include: [
            {
                model: User,
                attributes: ['lastname', 'firstname']
            },
            {
                model: Comment,
                attributes: ['text','id'],
                include: {
                    model: User,
                    attributes: ['lastname', 'firstname', 'id']
                }
            }
        ],
        order: [['createdAt', 'DESC']]
    })
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Des erreurs sont survenues lors de la récupération des publications de l'utilisateur"
            })
        })
}

// parametre pour trouver une publication avec son id
exports.findOne = (req, res) => {
    
    const id = req.params.id;
    
    Publication.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la recherchde de la publication par id avec id=" + id
            });
        });
};



// parametre pour supprimer une publication avec son id
exports.delete = (req, res) => {
    let publicationId = req.params.id;
    let userIdForDelete = req.userId

    User.findOne({
        where: {id: userIdForDelete},
        include:[   
            {
                model: Role,
            }
        ]
    })
    .then(user =>{
        let userForDeleteRole = user.roles[0].name;

        Publication.findOne({
            where: {id: publicationId},
        })
            .then(publication => {
    
                if (publication.userId === userIdForDelete || userForDeleteRole === "admin"){
    
                    Publication.destroy({
                        where: {id: publicationId}
                    })
                    .then(num => {
                        if (num == 1) {
                          res.send({
                            message: "la publication a bien été supprimé"
                          });
                        } else {
                            res.send({
                                message: `la publication n'as pas pu etre detruite avec son id=${publicationId}.!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: `la publication n'as pas pu etre detruite avec son id=${publicationId}.!`
                        });
                    });
                } else {
                    res.status(401).send({
                        message: 'impossible de supprimer ce message'
                    })
                }
                
            })
            .catch(err => {
                res.status(500).send({
                    message: "la recherche de la publication n'as pas abouti par id avec id=" + publicationId
                });
            });
    })
    .catch(err =>{
        res.status(500).send({
            message: "la recherche de l'utilisateur n'as pas abouti"
        })
    })
}


