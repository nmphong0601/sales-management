import axios from "axios";

class Services {
  // Cài đặt Repository chung cho tất cả các API all/single/insert/update/delete
  constructor(props) {
    this.endpoint = props.endpoint;
    this.serviceUrl = process.env.API_URL + this.endpoint + "/";

    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        const token = userInfo.AccessToken;
        config.headers.common["x-access-token"] = token;

        return config;
      }
    });
  }
  async all() {
    return axios
      .get(this.serviceUrl)
      .then((response) => {
        if (response.statusText !== "OK") {
          this.handleResponseError(response);
        }
        return response;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
  }
  async paged(pagingInfor) {
    const parameters = {
      expand: pagingInfor.expand,
      filter: pagingInfor.filter,
      search: pagingInfor.search,
      sort: pagingInfor.sort,
      page: pagingInfor.page,
      pageSize: pagingInfor.pageSize,
    };

    return axios
      .get(this.serviceUrl, { params: parameters })
      .then((response) => {
        if (response.statusText !== "OK") {
          this.handleResponseError(response);
        }
        return response;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
  }
  async single(id) {
    return axios
      .get(this.serviceUrl + "?id=" + id)
      .then((response) => {
        if (response.statusText !== "OK") {
          this.handleResponseError(response);
        }
        return response;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
  }
  async create(newObj) {
    return axios
      .post(this.serviceUrl, { newObj })
      .then((response) => {
        if (response.statusText !== "OK") {
          this.handleResponseError(response);
        }
        return response;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
  }
  async delete(id) {
    return axios
      .delete(this.serviceUrl + "?id=" + id)
      .then((response) => {
        if (response.statusText !== "OK") {
          this.handleResponseError(response);
        }
        return response;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
  }
  async update(id, obj) {
    return axios
      .put(this.serviceUrl + "?id=" + id, { obj })
      .then((response) => {
        if (response.statusText !== "OK") {
          this.handleResponseError(response);
        }
        return response;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
  }
  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
  }
  handleError(error) {
    console.log(error.message);
  }
}
export default Services;
