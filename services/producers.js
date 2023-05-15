const Producer = require("../respositories/producer");

async function single(id) {
  return Producer.getSingle(id);
}

async function all() {
  return Producer.getAll();
}

async function paged(page = 1, pageSize = 10) {
  return Product.getPage(page, pageSize);
}

async function insert(data) {
  return Producer.add(data);
}

async function update(id, data) {
  return Producer.update(id, data);
}

async function remove(id) {
  return Producer.delete(id);
}

module.exports = {
  single,
  all,
  paged,
  insert,
  update,
  remove,
};
