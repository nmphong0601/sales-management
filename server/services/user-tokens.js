const UserToken = require("../respositories/user-token");

async function single(where = "", params = []) {
  return UserToken.getSingle(where, params);
}

async function singleById(id) {
  return UserToken.getSingleById(id);
}

async function all(where = "", params = []) {
  return UserToken.getAll(where, params);
}

async function paged(page = 1, pageSize = 10, where = "", params = []) {
  return UserToken.getPage(page, pageSize, where, params);
}

async function insert(data) {
  return UserToken.add(data);
}

async function update(id, data) {
  return UserToken.update(id, data);
}

async function remove(id) {
  return UserToken.delete(id);
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
