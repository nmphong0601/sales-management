const AppDAO = require("./dao");

class Respositiory {
  constructor(table, key) {
    //Để khởi tạo một đối tượng từ class table Respositiory chúng ta cần truyền một đối tượng AppDAO cho nó
    this.dao = new AppDAO("./databases/QLBH_Web.db", table, key);
    this.table = table;
  }

  createTable(columns) {
    //Hàm tạo bảng này sẽ dùng để tạo ra cấu trúc bảng table nếu trong file csdl sqlite3 chưa có bảng này.
    const sql = `CREATE TABLE IF NOT EXISTS [${this.table}] (${columns})`;
    return this.dao.runQuery(sql);
  }

  getSingle(id) {
    return this.dao.getById(id);
  }

  getAll(where = "", params = []) {
    return this.dao.all(where, params);
  }

  getPage(page, pageSize, where = "", params = []){
    return this.dao.getPage(page, pageSize, where, params);
  }

  add(data) {
    return this.dao.insert(data);
  }

  update(id, data) {
    return this.dao.update(id, data);
  }

  delete(id) {
    return this.dao.delete(id);
  }
}

module.exports = Respositiory;
