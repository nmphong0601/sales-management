const Status = require("../respositories/status");

async function single(id) {
  return Status.getSingle(id);
}

async function all(where = "", params = []) {
  return Status.getAll(where, params);
}

async function paged(page = 1, pageSize = 10, where = "", params = []) {
  return Status.getPage(page, pageSize, where, params);
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
