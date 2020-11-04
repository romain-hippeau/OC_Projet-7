//multer seras utilisé pour la gestion du stockage des images

const multer = require('multer'); 
//fichier accepter
const MIME_TYPES = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/gif': 'gif'
};
// stockage des images dans le dossier images
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'images')
    },
    //On crée l'URL de l'image 
    filename: (req, file, callback) =>{
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype]; 
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage}).single('attachment');