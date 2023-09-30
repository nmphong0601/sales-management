const OrderDetail = require("../respositories/order-detail");

async function single(where = "", params = []) {
  return OrderDetail.getSingle(where, params);
}

async function singleById(id) {
  return OrderDetail.getSingleById(id);
}

async function all(where = "", params = []) {
  return OrderDetail.getAll(where, params);
}

async function paged(page = 1, pageSize = 10, where = "", params = []) {
  return OrderDetail.getPage(page, pageSize, where, params);
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
  singleById,
  all,
  paged,
  insert,
  update,
  remove,
};
