const Product = require("../respositories/product");

async function single(where = "", params = []) {
  return Product.getSingle(where, params);
}

async function singleById(id) {
  return Product.getSingleById(id);
}

async function all(where = "", params = []) {
  return Product.getAll(where, params);
}

async function paged(page = 1, pageSize = 10, where = "", params = []) {
  return Product.getPage(page, pageSize, where, params);
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
  singleById,
  all,
  paged,
  insert,
  update,
  remove,
};
