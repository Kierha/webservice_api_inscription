const mariadb = require("mariadb");
const path = require("path");

// Chargement des variables d'environnement pour le fichier .env (basé à la racine du projet)
const envPath = path.resolve(__dirname, "../../.env");
require("dotenv").config({ path: envPath });

/**
 * Configuration et création du pool de connexions à la base de données MariaDB.
 * @type {Pool}
 */
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  supportBigNumbers: true,
  bigNumberStrings: true,
});

/**
 * Teste la connexion à la base de données en utilisant le pool.
 * Si la connexion est réussie, elle affiche un message de succès.
 * Sinon, elle affiche l'erreur.
 * @async
 * @function
 */
async function testDbConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Connected to the database!");
    console.log("Database connection test successful!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    if (conn) conn.release(); // Libère la connexion lorsqu'elle n'est plus nécessaire
  }
}

module.exports = {
  pool,
  testDbConnection,
};

// Pour tester la connexion lors de l'initialisation du module, décommentez la ligne ci-dessous
// testDbConnection();
