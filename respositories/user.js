const Respositiory = require("./services");

class User extends Respositiory {
  createCategories() {
    return this.createTable(`
          [Id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
        , [f_Username] nvarchar(50) NULL COLLATE NOCASE
        , [f_Password] nvarchar(255) NULL COLLATE NOCASE
        , [f_Name] nvarchar(100) NULL COLLATE NOCASE
        , [f_Email] nvarchar(100) NULL COLLATE NOCASE
        , [f_DOB] datetime NOT NULL
        , [f_Permission] int NOT NULL
        , [f_Address] nvarchar(255) NULL COLLATE NOCASE
        , [f_Phone] nvarchar(20) NULL COLLATE NOCASE`);
  }
}

module.exports = new User("Users", "Id");
