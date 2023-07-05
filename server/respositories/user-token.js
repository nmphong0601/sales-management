const Respositiory = require("./respository");

class UserToken extends Respositiory {
  createUserToken() {
    return this.createTable(`
          [Id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
        , [UserId] INTEGER NOT NULL
        , [Token] ntext NOT NULL COLLATE NOCASE`);
  }
}

module.exports = new UserToken("UserToken", "Id");
