const Respositiory = require("./respository");

class Comments extends Respositiory {
  createCategories() {
    return this.createTable(`
          [Id] bigint NOT NULL
        , [UserID] int NULL
        , [Content] nvarchar(255) NULL COLLATE NOCASE
        , [Time] datetime NULL
        , [ProID] int NOT NULL`);
  }
}

module.exports = new Comments("Comments", "Id");
