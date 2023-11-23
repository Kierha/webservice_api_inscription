const { pool } = require("../config/db");

class UserModel {
  /**
   * Crée un nouvel utilisateur dans la base de données.
   * @param {string} firstName - Le prénom de l'utilisateur.
   * @param {string} email - L'email de l'utilisateur.
   * @returns {Promise<object>} - Le résultat de l'insertion dans la base de données.
   */
  async createUser(firstName, email) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        "INSERT INTO usersdata (firstName, email) VALUES (?, ?)",
        [firstName, email]
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }
}

module.exports = UserModel;
