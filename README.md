Bonjour,

j'ai réalisé ce projet dans le cadre de ma formation openclassroom, c'est un social network pour la société groupomania.

le back-end doit etre configuré avant le front afin de pouvoir accéder sans probléme au contenue

merci de bien vouloir creer une base de donnée s'appelant groupomania
ensuite aller dans le back-end dans config/db.config.js:
rentrez le mot de passe pour la connection a votre db et si besoin changez l'username si il est different de root

Si vous avez besoin de réinitialiser les tables de votre base de données, vous pouvez utiliser la synchronisation forcée en mettant force: true
a l'interieur de sequelize.sync({ });
qui se trouve dans back-end/server.js
-créer un dossier images dans le dosiser back-end pour enregistrer les images.

POUR LANCER Le back-end :
ensuite faire cd back-end npm install npm start.
Les framework utilisées sont :
Backend :

NodeJS,
Express,
jsonwebtoken,
Multer.

pour la configuration et la gestion de la base de donnée

MySql avec l'ORM Sequelize

Frontend :
Vuejs et ses dépendences
bootstrapp
axios et vee-validate


POUR LANCER L'APPLICATION FRONT :
cd front npm install npm run serve
