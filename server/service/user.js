const UserDAO = require("../dao/user");

class UserService {
  createUser(userDto) {
    const { firstName, lastName, email, password } = userDto;
    return UserDAO.createUser(firstName, lastName, email, password);
  }
  loginUser(userDto) {
    const { email, password } = userDto;
    return UserDAO.loginUser(email, password);
  }
}

module.exports = new UserService();
