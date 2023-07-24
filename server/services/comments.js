const Comment = require("../respositories/comment");

async function single(where = "", params = []) {
  return Comment.getSingle(where, params);
}

async function singleById(id) {
  return Comment.getSingleById(id);
}

async function all(where = "", params = []) {
  return Comment.getAll(where, params);
}

async function paged(page = 1, pageSize = 10, where = "", params = []) {
  return Comment.getPage(page, pageSize, where, params);
}

async function insert(data) {
  return Comment.add(data);
}

async function update(id, data) {
  return Comment.update(id, data);
}

async function remove(id) {
  return Comment.delete(id);
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
