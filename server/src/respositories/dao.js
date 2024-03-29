var path = require("path");
const sqlite3 = require("sqlite3");
const Promise = require("bluebird");

class AppDAO {
  constructor(dbFilePath, table, key) {
    const filePath = path.resolve(process.env.ROOT, dbFilePath);
    this.db = new sqlite3.Database(filePath, (err) => {
      //cần truyền vào một đường dẫn đến file csdl sqlite để khởi tạo một kết nối đến file để bắt đầu đọc ghi
      if (err) {
        console.log("Could not connect to database", err); //Kết nối chưa thành công, có lỗi
      }
    });

    this.table = table;
    this.key = key || "Id";
  }

  async getColumns() {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT NAME as COLUMN_NAME, DFLT_VALUE as COLUMN_DEFAULT, TYPE as DATA_TYPE FROM pragma_table_info('${this.table}')`,
        [],
        (err, rows) => {
          if (err) {
            console.log("Error running sql: " + sql);
            console.log(err);
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  runQuery(sql, params = []) {
    //Hàm do ta tự đặt tên gồm 2 tham số truyền vào.
    return new Promise((resolve, reject) => {
      //Tạo mới một Promise thực thi câu lệnh sql
      this.db.run(sql, params, function (err) {
        //this.db sẽ là biến đã kết nối csdl, ta gọi hàm run của this.db chính là gọi hàm run của sqlite3 trong NodeJS hỗ trợ (1 trong 3 hàm như đã nói ở trên)
        if (err) {
          //Trường hợp lỗi
          console.log("Error running sql " + sql);
          console.log(err);
          reject(err);
        } else {
          //Trường hợp chạy query thành công
          if (this.lastID !== 0) {
            resolve({ inserted: this.lastID }); //Trả về kết quả là một object có id lấy từ DB.
          } else {
            resolve({ changed: this.changes });
          }
        }
      });
    });
  }

  async get(where = "", params = []) {
    let sql = `SELECT * FROM ${this.table}  ${
      where !== "" ? `WHERE ${where}` : ""
    }`;
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getOne(where = "", params = []) {
    let sql = `SELECT * FROM ${this.table} ${
      where !== "" ? `WHERE ${where}` : ""
    } LIMIT 1`;

    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getById(id) {
    let sql = `SELECT * FROM ${this.table} WHERE ${this.key} = ?`;
    return new Promise((resolve, reject) => {
      this.db.get(sql, [id], (err, result) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async all(where = "", params = []) {
    let sql = `SELECT * FROM ${this.table} ${
      where !== "" ? `WHERE ${where}` : ""
    }`;
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async getPage(page, pageSize, where = "", params = []) {
    const offset = (Number(page) - 1) * Number(pageSize);
    const sql = `SELECT * FROM ${
      this.table
    } CROSS JOIN (SELECT COUNT(*) AS totalRows
                  FROM ${this.table}) ${
      where !== "" ? `WHERE ${where}` : ""
    } LIMIT ?,?`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, [offset, Number(pageSize), ...params], (err, rows) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async insert(data) {
    const columns = await this.getColumns();
    const _columns = columns.slice(1, columns.length);

    let sql = `INSERT INTO ${this.table} (${_columns
      .map((x) => x["COLUMN_NAME"])
      .join(", ")}) VALUES (${_columns.map((x) => "?").join(", ")})`;

    return this.runQuery(sql, Object.values(data));
  }

  async update(id, data) {
    const columns = await this.getColumns();
    const _columns = columns.slice(1, columns.length);

    let sql = `UPDATE ${this.table} SET ${_columns
      .map((item, index) => `${item["COLUMN_NAME"]} = ?`)
      .join(",")} WHERE ${this.key} = ?`;

    return this.runQuery(sql, [...Object.values(data), id]);
  }

  async delete(id) {
    return this.runQuery(`DELETE FROM ${this.table} WHERE ${this.key} = ?`, [
      id,
    ]);
  }
}

module.exports = AppDAO; //Cần phải exports (mở) cái class  này để một class bất kỳ có thể khởi tạo AppDAO và bắt đầu dùng kết nối đã được mở bên trên (biến this.db)
