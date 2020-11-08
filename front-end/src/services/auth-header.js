//fonction de récupération des données user dans le local storage user associée au token de l'utilisateur
export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken};
    } else {
      return {};
    }
  }