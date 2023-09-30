const Respositiory = require("./respository");

class Rating extends Respositiory {
  createCategories() {
    return this.createTable(`
          [Id] bigint NOT NULL
        , [ProID] int NOT NULL
        , [One] int NULL
        , [Two] int NULL
        , [Three] int NULL
        , [Four] int NULL
        , [Five] int NULL
        , [Rate] int NULL`);
  }
}

module.exports = new Rating("Rating", "Id");
