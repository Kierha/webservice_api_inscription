const UserModel = require("../models/userModel");

class UserController {
  constructor() {
    this.userModel = new UserModel();
  }

  /**
   * Méthode pour inscrire un nouvel utilisateur.
   * @param {object} req - L'objet de requête Express.
   * @param {object} res - L'objet de réponse Express.
   */
  signup = async (req, res) => {
    try {
      const { firstName, email } = req.body;
      await this.userModel.createUser(firstName, email);
      res.status(201).send("User created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating user: " + error.message);
    }
  };
}

module.exports = UserController;
