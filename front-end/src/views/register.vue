<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
            alt="avatar par défaut d'un utilisateur"
            />
            <form name="form" @submit.prevent="handleRegister">
                <div v-if="!successful">
                    <div class="form-group">
                        <label for="firstname">Votre prénom</label>
                        <input
                        v-model="user.firstname"
                        v-validate="'required|min:2|max:20'"
                        type="text"
                        class="form-control"
                        name="firstname"
                        id="firstname"
                        />
                        <div
                            v-if="submitted && errors.has('firstname')"
                            class="alert-danger"
                            >{{errors.first('firstname')}}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="lastname">Votre nom</label>
                        <input
                        v-model="user.lastname"
                        v-validate="'required|min:2|max:20'"
                        type="text"
                        class="form-control"
                        name="lastname"
                        id="lastname"
                        />
                        <div
                            v-if="submitted && errors.has('lastname')"
                            class="alert-danger"
                            >{{errors.first('lastname')}}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                        v-model="user.email"
                        v-validate="'required|email|max:50'"
                        type="email"
                        class="form-control"
                        name="email"
                        id="email"
                        />
                        <div
                            v-if="submitted && errors.has('email')"
                            class="alert-danger"
                            >{{errors.first('email')}}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                        v-model="user.password"
                        v-validate="'required|min:6|max:40'"
                        type="password"
                        class="form-control"
                        name="password"
                        id="password"
                        />
                        <div
                            v-if="submitted && errors.has('password')"
                            class="alert-danger"
                            >{{errors.first('password')}}
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block button" id="btn-inscription">S'enregistrer</button>
                    </div>
                </div>
            </form>

            <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
            >{{message}}</div>
        </div>
    </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '',''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  //les valeurs vont changer entre connecté et déconnecté
  //cela est renvoyée par vuex store
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  //quand l'utilisateur est creer , nous le renvoyons vers la page de profile
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>

<style  lang="scss">
label {
  display: block;
  margin-top: 10px;
  color: #042255;
  text-decoration: underline;
}
input{
  background-color: #04225533;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #FFF;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border: solid 5px #042255;
  border-radius: 25px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

#btn-inscription{
  background-color: #e70435;
  border: none;
  
}

.profile-img-card {
  width: 120px;
  height: 120px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
