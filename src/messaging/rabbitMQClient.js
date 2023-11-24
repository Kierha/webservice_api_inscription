const amqp = require("amqplib");
const { rabbitMQUrl, queueName } = require("../config/mqConfig");

class RabbitMQClient {
  constructor() {
    /**
     * @type {import('amqplib').Connection} Connexion RabbitMQ.
     */
    this.conn = null;
    /**
     * @type {import('amqplib').Channel} Canal RabbitMQ pour l'envoi de messages.
     */
    this.channel = null;
  }

  /**
   * Établit une connexion à RabbitMQ et crée un canal.
   * @returns {Promise<void>}
   */
  async connect() {
    this.conn = await amqp.connect(rabbitMQUrl);
    this.channel = await this.conn.createChannel();
    await this.channel.assertQueue(queueName);
  }

  /**
   * Envoie un message à la file RabbitMQ.
   * @param {string} message - Le message à envoyer.
   * @returns {Promise<void>}
   */
  async sendMessage(message) {
    await this.channel.sendToQueue(queueName, Buffer.from(message));
  }

  async close() {
    await this.conn.close();
  }
}

module.exports = RabbitMQClient;
