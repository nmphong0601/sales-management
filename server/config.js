const env = process.env;

const config = {
  pageSize: env.LIST_PER_PAGE || 10,
};

module.exports = config;