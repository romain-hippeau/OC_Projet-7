
<template>
    <div class="publication">
        <div class="header">
            <img class="header-img" src="../assets/icon.png" alt="" srcset="">
            <p class="auteur">
                {{publication.user.firstname}} {{publication.user.lastname}}
            </p>
            <button v-if="publication.userId == auth.user.id || auth.user.roles == 'ROLE_ADMIN'" class="button-social" @click="deletePost(publication.id)">
                  <img src="../assets/Close-2.png" alt="icone pour la suppression" class="icones-social">
                </button>
        </div>
        <div class="main">
            <p class="texte">
                {{publication.title}} 
            </p>
            <img v-if="publication.attachment != undefined" :src="publication.attachment" alt="Image ou gif publiée par un utilisateur" class="center-img">
        </div>
        <div class="foot">
            <p class="date">
                {{publication.createdAt | moment}}
            </p>
        </div>
        <div class="commentaires">
            <input type="text" v-model="textComment" v-on:keyup.enter="createComments" class="comment-input" placeholder="un petit commentaire ?">
            <div id=bloc-commentaires v-for="comments in publication.comments" :key="comments.id" class="publies">
                <p class="username">{{comments.user.firstname}} {{comments.user.lastname}}</p>
                <p class="textUser">{{comments.text}} </p>
                <p>creer le:{{publication.comments.createdAt | moment}}</p>
                <button v-if="comments.user.id == auth.user.id || auth.user.roles == 'ROLE_ADMIN'" class="button-delete" @click="deleteComments(comments.id)">
                  <img src="../assets/trash.png" alt="suppression d'un commentaire" class="trash">
                </button>
               
            </div>
        </div>
    </div>

</template>
<script>
import moment from 'moment';
import axios from 'axios';
import {mapState} from 'vuex';
import authHeader from '../services/auth-header';
export default {
    name:"Publi",
    components: {},
    data(){
        return {
            textComment:""
        }
    },
    computed:{
        ...mapState(["publications","auth", ])
    },
    props: {
        publication: {
            type:Object,
            required: true
        },
        comments:{
            type:Object,

        }
    },
    methods: {
        deletePost(id) {
            axios
                .delete(`http://localhost:8081/api/publications/${id}`, {headers: authHeader()})
                .then(() => {
                    this.$store.dispatch('loadPublications')
                }) // ...Si non on envoi une erreur
                .catch(error => console.log(error));
        },
        createComments(){
            let dataComments = {
                text: this.textComment,
                publicationId: this.publication.id,
                userId: this.auth.user.id
            }
            axios
                .post('http://localhost:8081/api/commentaires',dataComments)
                .then((res)=>{
                    console.log(res)
                    this.textComment=""
                    this.$store.dispatch('loadPublications')
                });
        },
        deleteComments(id) {
            
            axios
                .delete(`http://localhost:8081/api/commentaires/${id}`,{headers: authHeader()})
                .then(() => {
                    this.$store.dispatch('loadPublications')
                }) // ...Si non on envoi une erreur
                .catch(error => console.log(error));
        },

    },
    filters:{
        moment: (date)=>{
            return moment(date).locale('fr').format('LLL');
        }
    }
};
</script>
<style lang="scss">
body{
  background-color: lightgray;
}
.publication{
    background: white;
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: 0 10px 6px -6px #777;
    padding-bottom: 5px;
    .header{
        display: flex;
        padding: 15px;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        background-color: white;
        .img{
            max-width: 50px;
        }
        .auteur{
            font-size: 20px;
            padding-left: 18px;
            text-align: center;
        }
    }
    .main{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .center-img{
            width: 100%;
        }
        .texte{
            padding-left: 15px;
            text-align: left;
        }
    }
    .foot{
        margin-top: 10px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .social{
            display: flex;
            justify-content: space-evenly;
            width: 60%;
        }
        .date{
            margin-top: 15px;
            padding-left: 15px;
            text-decoration:underline;

        }
    }
    .commentaires{
        .comment-input{
            background-color: #fff;
            border: solid 2px #F64C71;
            border-radius: 25px;
            width: 90%;
            margin: 0 5% 5% 5%;
            padding-left: 5%;
        }
        .publies{
            background-color: whitesmoke;
            width: 90%;
            margin:0% 5% 5% 5%;
            border-radius: 25px;
            padding: 5%;
            position: relative;
        }
    }
}
.username{
    color: #F64C71;
    margin: 0;
}
.textUser{
    margin: 0;
}
.trash{
    width: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
}

.button-social{
    border: none;
    background-color: white;
}
.icones-social{
    max-width: 25px;
    max-height: 25px;
    background-color: white;
}
.button-delete{
    background-color: whitesmoke;
    border: none;
}
.header-img{
    width: 45px;
    height: 45px;
    background-color: lightgrey;
}  
</style>