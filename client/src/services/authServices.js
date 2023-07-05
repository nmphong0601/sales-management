import axios from 'axios';
import Services from './repository';

class AuthServices extends Services {
  constructor(props) {
    super(props);
  }

  async login(loginInfo) {
    const parameters = {
      Username: loginInfo.user_name,
      Password: loginInfo.password,
    };

    return axios
      .post(this.serviceURL + 'login', parameters)
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
}

export default new AuthServices({ object: 'auths' });
