<template>
<div class="containe">
      <div class="login">
         <div class="container">
              <h1>REGISTER</h1>
              <input type="email" placeholder="Email">
              <input type="password" placeholder="Password"><br>
              <input type="password" placeholder="Password"><br>
              <input type="password" placeholder="Password"><br>
              <button> REGISTER </button>
              
              <div class="clearfix"></div> 
         </div>
      </div>
      <div class="register">
          <div class="container">
              <i class="fas fa-user-plus fa-5x"></i>
             <img class="logo-group" src="../assets/icon-blanc.png" alt="" srcset="">
              <p>Si vous etes enregister , veillez vous connectez</p>
              <button><router-link to="/">LOGIN</router-link> <i class="fas fa-arrow-circle-right"></i></button>
          </div>
      </div>  
    </div>
</template>


<script>

export default {
  name: 'Login',
  data () {
    return {
         email: '',
         password: '',
    
    }
  },
  methods: {
   login () {
     console.log({ email: this.email, password: this.password });
 axios.post('http://localhost:3000/api/users/login', { email:this.email, password: this.password })
    .then(request => this.loginSuccessful(request))
    .catch(() => this.loginFailed())
},
loginSuccessful (req) {
  if (!req.data.token) {
    this.loginFailed()
    return { email:this.email, password: this.password }
  }

  localStorage.token = req.data.token
  this.error = false

  this.$router.replace(this.$route.query.redirect || '/user/publication')
},

loginFailed () {
  this.error = 'Login failed!'
  delete localStorage.token
}
  }
}
</script>

<style lang="css">

@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
html { 
  margin:0;
  padding:0;
  background: url("../assets/fond.png") no-repeat center fixed; 
  -webkit-background-size: cover; /* pour anciens Chrome et Safari */
  background-size: cover; /* version standardisée */
}
body{
    display: flex;
    justify-content: center;
    align-items: center;
    height:100vh;
    font-family: sans-serif;
}
.containe{
    width: 80%;
    margin: auto;
    padding: 20px;
  height:700px;
 
}

.login ,.register{width: 50%}

/*Start Login Style*/
.login{
    float:left;
    background-color: #fafafa;
    height: 100%;
    border-radius: 10px 0 0 10px;
    text-align: center;
    flex-direction: column;
}
.login h1{
    margin-bottom: 40px;
    font-size: 2.5em;
}

input{
    width: 100%;
    padding: 10px;
    margin-bottom: 30px;
    border: none;
    background-color: #eeeeef;
}

.login span{
    float: left
}
.login a{
    float: right;
    text-decoration: none;
    color: #000;
    transition: 0.3s all ease-in-out;
}
.login a:hover{color: #9526a9;font-weight: bold}
.login button{
    width: 100%;
    margin: 30px 0;
    padding: 10px;
    border: none;
    background-color: #9526a9;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    transition: 0.3s all ease-in-out;
}
.login button:hover{
    width:97%;
    font-size: 22px;
    border-radius: 5px;
    
}
.login hr{
    width: 30%;
    display: inline-block
}

.login p{
    display: inline-block;
    margin: 0px 10px 30px;
}
.login ul{
    list-style: none;
    margin-bottom:40px;  
}
.login ul li{
    display: inline-block;
    margin-right: 30px;
    cursor: pointer;
}
.login ul li:hover{opacity: 0.6}
.login ul li:last-child{margin-right: 0}
.login .copyright{
    display: inline-block;
    float: none;
}
a{
  color: white;
  text-decoration: none;
}
/*Start Register Style*/
.register{
    float: right;
    background-image: linear-gradient(135deg, #23212f 5%, #9526a9 95%);
    height: 100%;
    color:#fff;
    border-radius:  0 10px 10px  0;
    text-align: center;
}
.register h2{
    margin: 30px 0;
    font-size: 50px;
    letter-spacing: 3px
}
.register p{
    font-size: 18px;
    margin-bottom: 30px;
}
.register button{
    background-color: transparent;
    border: 1px solid #FFF;
    border-radius: 20px;
    padding: 10px 20px;
    color: #fff;
    font-size: 20px;
    text-transform: uppercase;
    transition:0.2s all  ease-in-out;
}
.register button:hover{
    color: #9526a9;
    background-color: #fff;
    cursor: pointer;
}


</style>