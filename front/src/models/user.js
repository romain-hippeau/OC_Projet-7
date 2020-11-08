//model User qui auras les memes carateristiques que dans notre base de données.

export default class User {
    constructor(firstname, lastname, email, password) {
      this.firstrname = firstname;
      this.lastrname = lastname;
      this.email = email;
      this.password = password;
    }
}

  