import axios from 'axios';

//mise d l'url de base de l'api dans un constante pour la réutiliser ensuite
const API_URL = 'http://localhost:8081/api/auth/';

//On crée une class pour y ranger les méthodes login/logout et register

class AuthService {
    
    login(user) {
        //on utilise axios pour les appels a l'api
        return axios
            .post(API_URL + 'signin', {
                email: user.email,
                password: user.password
            })
            //si la reponse est bonne le token seras envoyée dans le local storage
            .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
            });
    }

    logout() {
        //quand l'utilisateur se déconnecte , je vide le local storage
        localStorage.removeItem('user');
        
    }

    register(user) {
        //pour la fonction register , je post les données collecté a l'api
        //sous forme de tableau
        return axios.post(API_URL + 'signup', {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();
