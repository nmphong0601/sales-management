const Respositiory = require("./respository");

class Order extends Respositiory {
  createCategories() {
    return this.createTable(`
          [Id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
        , [OrderDate] datetime NOT NULL
        , [UserID] int NOT NULL
        , [Total] money NULL
        , [SttID] int NOT NULL`);
  }
}

module.exports = new Order("Orders", "Id");
