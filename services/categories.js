const Category = require("../respositories/category");
const config = require("../config");

async function single(id) {
  return Category.getSingle(id);
}

async function all() {
  return Category.getAll();
}

async function paged(page = 1) {
  return Category.getPage(page, config.pageSize);
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