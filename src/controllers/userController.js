const UserModel = require("../models/userModel");
const RabbitMQClient = require("../messaging/rabbitMQClient");

class UserController {
  constructor() {
    this.userModel = new UserModel();
    this.rabbitMQClient = new RabbitMQClient();
    this.rabbitMQClient.connect();
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

      // Envoi du message à RabbitMQ
      const message = JSON.stringify({ firstName, email });
      await this.rabbitMQClient.sendMessage(message);

      res.status(201).send("User created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating user: " + error.message);
    }
  };
}

module.exports = UserController;
