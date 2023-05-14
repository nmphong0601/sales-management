const Product = require("../respositories/product")
const config = require("../config");

async function single(id) {
  return Product.getSingle(id);
}

async function all() {
  return Product.getAll();
}

async function paged(page = 1) {
  return Product.getPage(page, config.pageSize);
}

async function insert(data) {
  return Product.add(data);
}

async function update(id, data) {
  return Product.update(id, data);
}

async function remove(id) {
  return Product.delete(id);
}

module.exports = {
  single,
  all,
  paged,
  insert,
  update,
  remove,
};