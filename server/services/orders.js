const Order = require("../respositories/order");

async function single(id) {
  return Order.getSingle(id);
}

async function all(where = "", params = []) {
  return Order.getAll(where, params);
}

async function paged(page = 1, pageSize = 10, where = "", params = []) {
  return Order.getPage(page, pageSize, where, params);
}

async function insert(data) {
  return Order.add(data);
}

async function update(id, data) {
  return Order.update(id, data);
}

async function remove(id) {
  return Order.delete(id);
}

module.exports = {
  single,
  all,
  paged,
  insert,
  update,
  remove,
};
