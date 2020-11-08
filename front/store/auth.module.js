import AuthService from '../services/auth.service';//contient nos requete axios

const user = JSON.parse(localStorage.getItem('user'));//on utilise json.parse pour enregister notre token en json

const initState = user
  ? { status: { loggedIn: true }, user }    //state = notre token
  : { status: { loggedIn: false }, user: null };//state = null


export const auth = {
    namespaced: true,
    state: initState,

    actions: {
        //utilisation de login et axios pour envoyer user dans un stade de mutation
        //qui a soit success ou failure comme nom
        login({ commit }, user) {
            return AuthService.login(user).then(
            user => {
                commit('loginSuccess', user);
                return Promise.resolve(user);
            },
            error => {
                commit('loginFailure');
                return Promise.reject(error);
            }
            );
        },//supression du token authorization et renvoie vers la mutation logout
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        //meme structure de code que dans login
        register({ commit }, user) {
            return AuthService.register(user).then(
            response => {
                commit('registerSuccess');
                return Promise.resolve(response.data);
            },
            error => {
                commit('registerFailure');
                return Promise.reject(error);
            }
            );
        }
    },
    //je met a jour les informations qui sont stockées dans initState soit
    //avec null et false qui l'état basique quand l'utilisateur n'est pas connecté
    // ou avec les données quand l'utilisateur est connécté
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
            console.log(state)
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
};
