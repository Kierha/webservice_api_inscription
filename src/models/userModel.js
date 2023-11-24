const { pool } = require("../config/db");

/**
 * Modèle d'utilisateur pour la gestion des données utilisateur dans la base de données.
 */
class UserModel {
  /**
   * Crée un nouvel utilisateur avec les informations fournies.
   *
   * @param {string} firstName - Le prénom de l'utilisateur.
   * @param {string} email - L'adresse e-mail de l'utilisateur.
   * @param {string} verificationToken - Le jeton de vérification de l'utilisateur.
   * @returns {Promise<any>} - Une promesse résolue avec le résultat de la création de l'utilisateur.
   */
  async createUser(firstName, email, verificationToken) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        "INSERT INTO usersdata (firstName, email, verificationToken) VALUES (?, ?, ?)",
        [firstName, email, verificationToken]
      );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  /**
   * Vérifie un jeton de vérification et met à jour le statut de vérification de l'utilisateur.
   *
   * @param {string} verificationToken - Le jeton de vérification à vérifier.
   * @returns {Promise<any>} - Une promesse résolue avec le résultat de la mise à jour du statut de vérification.
   */
  async verifyToken(verificationToken) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        "UPDATE usersdata SET isVerified = true WHERE verificationToken = ?",
        [verificationToken]
      );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }
}

module.exports = UserModel;
