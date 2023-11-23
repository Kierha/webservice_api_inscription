const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

/**
 * Routeur pour les opérations liées aux utilisateurs.
 * @param {object} db - L'objet de base de données.
 * @returns {object} - Le routeur Express configuré.
 */
module.exports = (db) => {
  const userController = new UserController(db);

  router.post("/signup", userController.signup);

  return router;
};
