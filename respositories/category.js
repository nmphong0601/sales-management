const Respositiory = require("./respository");

class Category extends Respositiory {
  createCategories() {
    return this.createTable(`
          [Id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
        , [CatName] nvarchar(255) NOT NULL COLLATE NOCASE)`);
  }
}

module.exports = new Category("Categories", "Id");
