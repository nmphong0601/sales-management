const Respositiory = require("./respository");

class Status extends Respositiory {
  createCategories() {
    return this.createTable(`
          [Id] int NOT NULL
        , [SttName] nvarchar(255) NULL COLLATE NOCASE
        , CONSTRAINT [sqlite_autoindex_Statuses_1] PRIMARY KEY ([Id])`);
  }
}

module.exports = new Status("Statuses", "Id");
