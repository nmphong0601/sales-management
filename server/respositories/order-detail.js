const Respositiory = require("./respository");

class OrderDetails extends Respositiory {
  createCategories() {
    return this.createTable(`
          [Id] bigint NOT NULL
        , [OrderID] int NOT NULL
        , [ProID] int NOT NULL
        , [Quantity] int NULL
        , [Price] money NULL
        , [Amount] money NULL`);
  }
}

module.exports = new OrderDetails("OrderDetails", "Id");
