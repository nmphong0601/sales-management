const Order = require("../respositories/order");
const config = require("../config");

async function single(id) {
  return Order.getSingle(id);
}

async function all() {
  return Order.getAll();
}

async function paged(page = 1) {
  return Order.getPage(page, config.pageSize);
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