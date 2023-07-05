import Services from './repository';

class UserServices extends Services {
  constructor(props) {
    super(props);
  }
}

export default new UserServices({ object: 'users' });
