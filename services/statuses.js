const Status = require("../respositories/status");

async function single(id) {
  return Status.getSingle(id);
}

async function all() {
  return Status.getAll();
}

async function paged(page = 1, pageSize = 10) {
  return Product.getPage(page, pageSize);
}

async function insert(data) {
  return Status.add(data);
}

async function update(id, data) {
  return Status.update(id, data);
}

async function remove(id) {
  return Status.delete(id);
}

module.exports = {
  single,
  all,
  paged,
  insert,
  update,
  remove,
};
