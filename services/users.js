const User = require("../respositories/user");
const config = require("../config");

async function single(id) {
  return User.getSingle(id);
}

async function all() {
  return User.getAll();
}

async function paged(page = 1) {
  return User.getPage(page, config.pageSize);
}

async function insert(data) {
  return User.add(data);
}

async function update(id, data) {
  return User.update(id, data);
}

async function remove(id) {
  return User.delete(id);
}

module.exports = {
  single,
  all,
  paged,
  insert,
  update,
  remove,
};