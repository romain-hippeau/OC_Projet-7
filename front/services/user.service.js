
import axios from 'axios';
import authHeader from './auth-header';
//pour facilité l'utilisation je remet l'url de l'api dans une constante
const API_URL = 'http://localhost:8080/api/test/';
//je creer des fonction pour définir l'accés des differents utilisateurs. 
//authheader() me permettras d'envoyer le token  avec une requete axios
class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();