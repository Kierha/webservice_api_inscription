const UserModel = require("../models/userModel");
const RabbitMQClient = require("../messaging/rabbitMQClient");
const { v4: uuidv4 } = require("uuid");

/**
 * Contrôleur utilisateur pour la gestion des utilisateurs et de l'authentification.
 */
class UserController {
  /**
   * Crée une instance du contrôleur utilisateur.
   * Initialise le modèle d'utilisateur et le client RabbitMQ.
   */
  constructor() {
    this.userModel = new UserModel();
    this.rabbitMQClient = new RabbitMQClient();
    this.rabbitMQClient.connect();
  }

  /**
   * Crée un nouvel utilisateur avec les informations fournies dans la requête.
   * Génère un jeton de vérification, envoie un message à RabbitMQ et renvoie une réponse appropriée.
   *
   * @param {Request} req - L'objet de requête Express.
   * @param {Response} res - L'objet de réponse Express.
   * @returns {Promise<void>}
   */
  signup = async (req, res) => {
    try {
      const { firstName, email } = req.body;
      const verificationToken = uuidv4();
      await this.userModel.createUser(firstName, email, verificationToken);

      const message = JSON.stringify({ firstName, email, verificationToken });
      await this.rabbitMQClient.sendMessage(message);

      res.status(201).send("User created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating user: " + error.message);
    }
  };

  /**
   * Vérifie un jeton de vérification en utilisant les informations fournies dans la requête.
   * Met à jour le statut de vérification de l'utilisateur et renvoie une réponse appropriée.
   *
   * @param {Request} req - L'objet de requête Express.
   * @param {Response} res - L'objet de réponse Express.
   * @returns {Promise<void>}
   */
  verifyToken = async (req, res) => {
    try {
      const { verificationToken } = req.body;
      await this.userModel.verifyToken(verificationToken);
      res.status(200).send("Token verified successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error verifying token: " + error.message);
    }
  };
}

module.exports = UserController;
