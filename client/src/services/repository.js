import axios from 'axios';

class Services {
  constructor(props) {
    const userInfor = JSON.parse(localStorage.getItem('userInfor')) || null;
    this.endpoint = props.object;
    this.serviceURL = `${process.env.API_URL}/${this.endpoint}/`;
    const axiosInstance = axios.create({
      baseURL: this.serviceURL,
      headers: {
        'x-api-key': process.env.API_KEY,
        'x-access-token': userInfor?.accessToken,
      },
    });

    // Add a request interceptor
    axiosInstance.interceptors.request.use((config) => {
      const userInfor = JSON.parse(localStorage.getItem('userInfor'));
      if (!config.headers['x-access-token']) {
        const { accessToken } = userInfor;
        config.headers['x-access-token'] = accessToken;
      } else {
        // Update accessToken in localStorage from header
        userInfor.accessToken = config.headers['x-access-token'];
        localStorage.setItem('userInfor', JSON.stringify(userInfor));
      }

      return config;
    });

    // Add a response interceptor
    axiosInstance.interceptors.response.use(
      function (response) {
        // Do something with response data
        return response;
      },
      async function (error) {
        const { response, config } = error;

        // Get new accessToken
        if (response.status === 401 && !config.sent) {
          config.sent = true;
          const result = await axios.get(
            `${process.env.API_URL}/auths/refresh`,
            { withCredentials: true }
          );

          config.headers['x-access-token'] = result?.data?.accessToken;
          return axiosInstance.request(config);
        }
        return Promise.reject(error);
      }
    );

    this.axiosInstance = axiosInstance;
  }
  async all() {
    return this.axiosInstance
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

    return this.axiosInstance
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
    return this.axiosInstance
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
    return this.axiosInstance
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
    return this.axiosInstance
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
    return this.axiosInstance
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
