const Respositiory = require("./respository");

class Producer extends Respositiory {
  createCategories() {
    return this.createTable(`
          [Id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
        , [ProducerName] nvarchar(255) NULL COLLATE NOCASE`);
  }
}

module.exports = new Producer("Producers", "Id");
