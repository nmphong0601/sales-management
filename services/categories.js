const Category = require("../respositories/category");

async function single(id) {
  return Category.getSingle(id);
}

async function all(where = "", params = []) {
  return Category.getAll(where, params);
}

async function paged(page = 1, pageSize = 10) {
  return Category.getPage(page, pageSize);
}

async function insert(data) {
  return Category.add(data);
}

async function update(id, data) {
  return Category.update(id, data);
}

async function remove(id) {
  return Category.delete(id);
}

module.exports = {
  single,
  all,
  paged,
  insert,
  update,
  remove,
};
