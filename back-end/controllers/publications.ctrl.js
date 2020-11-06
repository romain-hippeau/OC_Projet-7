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
// implementation pour trouver toutes les publications
// implementation pour trouver et retourner une publication
// implementation pour supprimer une publication