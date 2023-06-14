const Rating = require("../respositories/rating");

async function single(id) {
  return Rating.getSingle(id);
}

async function all(where = "", params = []) {
  return Rating.getAll(where, params);
}

async function paged(page = 1, pageSize = 10) {
  return Product.getPage(page, pageSize);
}

async function insert(data) {
  return Rating.add(data);
}

async function update(id, data) {
  return Rating.update(id, data);
}

async function remove(id) {
  return Rating.delete(id);
}

module.exports = {
  single,
  all,
  paged,
  insert,
  update,
  remove,
};
