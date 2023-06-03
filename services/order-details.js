const OrderDetail = require("../respositories/order-detail");

async function single(id) {
  return OrderDetail.getSingle(id);
}

async function all(where = "", params = []) {
  return OrderDetail.getAll(where, params);
}

async function paged(page = 1, pageSize = 10) {
  return Product.getPage(page, pageSize);
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
