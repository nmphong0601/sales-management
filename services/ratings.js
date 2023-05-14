const Rating = require("../respositories/rating");
const config = require("../config");

async function single(id) {
  return Rating.getSingle(id);
}

async function all() {
  return Rating.getAll();
}

async function paged(page = 1) {
  return Rating.getPage(page, config.pageSize);
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