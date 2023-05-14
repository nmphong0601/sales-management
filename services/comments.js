const Comment = require("../respositories/comment");
const config = require("../config");

async function single(id) {
  return Comment.getSingle(id);
}

async function all() {
  return Comment.getAll();
}

async function paged(page = 1) {
  return Comment.getPage(page, config.pageSize);
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