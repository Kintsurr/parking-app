const db = require('../config/db')

class Post {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  
     save() {
      // Implementation for saving user to the database
  
      let sql ="INSERT `parking-app`.users( " + `name, email) VALUES( '${this.name}', '${this.email}');`
      const [newPost, _] =  db.execute(sql);

      return newPost;
    }
  
    static findAll() {
      let sql = "SELECT * FROM `parking-app`.users"

      return db.execute(sql);
    }

    static findById(id) {
      let sql = "SELECT * FROM `parking-app`.users " + `WHERE idusers = ${id}`;

      return db.execute(sql);
    }
    
  }
  module.exports = Post;
  
