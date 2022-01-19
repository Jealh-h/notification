const BaseDAO = require("./index");
const UserModel = require("../model/user");

class UserDAO extends BaseDAO {
    constructor() {
        super(UserModel);
    }
}

module.exports = UserDAO;