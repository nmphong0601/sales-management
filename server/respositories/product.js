const Respositiory = require('./respository');

class Product extends Respositiory {
    createProducts(){
        return this.createTable(`
          [Id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
        , [ProName] nvarchar(255) NOT NULL COLLATE NOCASE
        , [TinyDes] ntext NULL
        , [FullDes] ntext NULL
        , [Price] money NULL
        , [ProducerID] int NOT NULL
        , [Quantity] int NOT NULL
        , [View] int NOT NULL
        , [MadeIn] nvarchar(50) NOT NULL COLLATE NOCASE
        , [CatID] int NOT NULL
        , [ReceipDate] datetime NULL
        , [Orders] int NULL`);
    }
}

module.exports = new Product("Products", "Id");
