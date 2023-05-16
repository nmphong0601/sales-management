const Respositiory = require("./respository");

class Status extends Respositiory {
  createCategories() {
    return this.createTable(`
          [Id] int NOT NULL
        , [SttName] nvarchar(255) NULL COLLATE NOCASE`);
  }
}

module.exports = new Status("Statuses", "Id");
