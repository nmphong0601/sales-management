const Producer = require("../respositories/producer");
const config = require("../config");

async function single(id) {
  return Producer.getSingle(id);
}

async function all() {
  return Producer.getAll();
}

async function paged(page = 1) {
  return Producer.getPage(page, config.pageSize);
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