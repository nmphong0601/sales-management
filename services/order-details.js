const OrderDetail = require("../respositories/order-detail");
const config = require("../config");

async function single(id) {
  return OrderDetail.getSingle(id);
}

async function all() {
  return OrderDetail.getAll();
}

async function paged(page = 1) {
  return OrderDetail.getPage(page, config.pageSize);
}

async function insert(data) {
  return OrderDetail.add(data);
}

async function update(id, data) {
  return OrderDetail.update(id, data);
}

async function remove(id) {
  return OrderDetail.delete(id);
}

module.exports = {
  single,
  all,
  paged,
  insert,
  update,
  remove,
};