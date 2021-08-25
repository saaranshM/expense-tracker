const UserDAO = require("../dao/user");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");

// heplers

const generateAndAddToken = async (userId) => {
  // generate jwt token for user
  const token = jwtGenerator({ user_id: userId });

  // call function to add token to tokens array
  await UserDAO.addTokenToArray(userId, token);

  return token;
};

class UserService {
  async createUser(userDto) {
    const { firstName, lastName, email, password } = userDto;

    // creating a new user
    const userId = await UserDAO.createUser(email, password);
    // throw error if user was not created
    if (!userId) {
      throw new Error("error-creating-user");
    }

    // adding profile of user
    const userProfile = await UserDAO.addUserProfile(
      userId,
      firstName,
      lastName
    );

    // throw error if profile was not created
    if (!userProfile) {
      throw new Error("error-creating-profile");
    }

    // generated and added token to array
    const token = await generateAndAddToken(userId);

    // return the token to the controller
    return token;
  }
  async loginUser(userDto) {
    const { email, password } = userDto;
    const user = await UserDAO.loginUser(email, password);

    if (!user) {
      throw new Error("error-loging-in");
    }

    if (user.length < 1) {
      throw new Error("not-found");
    }

    // check if password is valid
    const isPasswordValid = await bcrypt.compare(
      password,
      user[0].user_password
    );

    // throw invalid-credentials error if password is not valid
    if (!isPasswordValid) {
      throw new Error("invalid-credentials");
    }

    // generated and added token to array
    const token = await generateAndAddToken(user[0].user_id);

    // return the token to the controller
    return token;
  }
}

module.exports = new UserService();
