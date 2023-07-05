import axios from 'axios';

class Services {
  constructor(props) {
    this.endpoint = props.object;
    this.serviceURL = `${process.env.API_URL}/${this.endpoint}/`;

    // Add a request interceptor
    axios.interceptors.request.use((config) => {
      if (!config.url.includes('login')) {
        const userInfor = JSON.parse(localStorage.getItem('userInfor'));
        if (userInfor) {
          const token = userInfor.accessToken;

          config.headers['x-api-key'] = process.env.API_KEY;
          config.headers['x-access-token'] = token || null;

          return config;
        }
      }

      return config;
    });

    // Add a response interceptor
    axios.interceptors.response.use(
      function (response) {
        // Do something with response data
        return response;
      },
      function (error) {
        const { response } = error;
        if (response.data === 'Token is expired') {
          const userInfor = JSON.parse(localStorage.getItem('userInfor'));

          return axios
            .get(`${process.env.API_URL}/auths/token`, {
              params: { refreshToken: userInfor.refreshToken },
            })
            .then(({ accessToken }) => {
              userInfor.accessToken = accessToken;
              localStorage.setItem('userInfor', JSON.stringify(userInfor));
            });
        }
        return Promise.reject(error);
      }
    );
  }
  async all() {
    return axios
      .get(this.serviceURL)
      .then((response) => {
        if (response.statusText !== 'OK') {
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
      page: pagingInfor.page,
      pageSize: pagingInfor.pageSize,
      where: pagingInfor.search || null,
      params: pagingInfor.params || [],
    };

    return axios
      .get(this.serviceURL + 'paging', { params: parameters })
      .then((response) => {
        if (response.statusText !== 'OK') {
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
      .get(this.serviceURL + id)
      .then((response) => {
        if (response.statusText !== 'OK') {
          this.handleResponseError(response);
        }

        return response;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
  }
  async create(newExam) {
    return axios
      .post(this.serviceURL, { newExam })
      .then((response) => {
        if (response.statusText !== 'OK') {
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
      .delete(this.serviceURL + id)
      .then((response) => {
        if (response.statusText !== 'OK') {
          this.handleResponseError(response);
        }

        return response;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
  }
  async update(id, updatedExam) {
    return axios
      .put(this.serviceURL + id, { updatedExam })
      .then((response) => {
        if (response.statusText !== 'OK') {
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
    throw new Error('HTTP error, status = ' + response.status);
  }
  handleError(error) {
    console.log(error.message);
  }
}
export default Services;
