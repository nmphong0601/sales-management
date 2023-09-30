const Rating = require("../respositories/rating");

async function single(where = "", params = []) {
  return Rating.getSingle(where, params);
}

async function singleById(id) {
  return Rating.getSingleById(id);
}

async function all(where = "", params = []) {
  return Rating.getAll(where, params);
}

async function paged(page = 1, pageSize = 10, where = "", params = []) {
  return Rating.getPage(page, pageSize, where, params);
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
  singleById,
  all,
  paged,
  insert,
  update,
  remove,
};
