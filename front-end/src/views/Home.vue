<template>
  <div class="container">
    <header class=" jumbotron-accueil">
    <h2 class="h-home">Bienvenue sur le social network groupomania</h2>
    <h4 class="t-home">Un espace dédié au employés groupomania</h4>
    <p class="p-home">Aprés vous etre inscrit ou connecté , vous pourrez accéder et participer au service,
       vous pourrez commenter, publier (photo et autres ...), nous esperons que cela vous permetras
       d'établir une meilleur relation entre collegues .
    </p>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
};
</script>
<style lang="scss">
.jumbotron-accueil{
display: flex;
justify-content: center;
flex-direction: column;
flex-basis: 85%;
align-items: center;
margin-top: 200px;
box-shadow: 2px 2px 5px 2px black;
padding: 20px;
text-align: center;
.t-home{
  margin: 30px;
}
}


</style>
