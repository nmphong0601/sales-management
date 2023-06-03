const User = require("../respositories/user");

async function single(id) {
  return User.getSingle(id);
}

async function all(where = "", params = []) {
  return User.getAll(where, params);
}

async function paged(page = 1, pageSize = 10) {
  return User.getPage(page, pageSize);
}

async function insert(data) {
  return User.add(data);
}

async function update(id, data) {
  return User.update(id, data);
}

async function remove(id) {
  return User.delete(id);
}

async function runQuery(sql) {
  return User.runQuery(sql);
}

module.exports = {
  single,
  all,
  paged,
  insert,
  update,
  remove,
  runQuery,
};
