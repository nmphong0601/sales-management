const Comment = require("../respositories/comment");

async function single(id) {
  return Comment.getSingle(id);
}

async function all() {
  return Comment.getAll();
}

async function paged(page = 1, pageSize = 10) {
  return Comment.getPage(page, pageSize);
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
  all,
  paged,
  insert,
  update,
  remove,
};
