const Producer = require("../respositories/producer");

async function single(where = "", params = []) {
  return Producer.getSingle(where, params);
}

async function singleById(id) {
  return Producer.getSingleById(id);
}

async function all(where = "", params = []) {
  return Producer.getAll(where, params);
}

async function paged(page = 1, pageSize = 10, where = "", params = []) {
  return Producer.getPage(page, pageSize, where, params);
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
  singleById,
  all,
  paged,
  insert,
  update,
  remove,
};
