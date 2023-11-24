# API d'Inscription Utilisateur

Ce projet est une API REST conçue pour gérer l'inscription des utilisateurs. Elle intègre une fonctionnalité d'envoi de messages via RabbitMQ à un service consommateur qui envoie un email de vérification.

## Technologies

- Node.js
- Express
- RabbitMQ
- MariaDB
- Docker (optionnel)

## Installation

### Prérequis

- Node.js (v16 ou supérieure)
- MariaDB
- RabbitMQ
- Docker (optionnel)

### Configuration de la Base de Données

1. Créez une base de données MariaDB.
2. Exécutez le script SQL fourni pour créer les tables nécessaires.

### Installation Manuelle en Local

1. Clonez le dépôt GitHub :
   ```
   git clone https://github.com/Kierha/webservice_api_inscription.git
   ```
2. Accédez au dossier du projet :
   ```
   cd webservice_api_inscription
   ```
3. Installez les dépendances :
   ```
   npm install
   ```
4. Configurez vos variables d'environnement dans un fichier `.env` à la racine du projet.

### Lancement du Projet en Local

Après avoir installé les dépendances et configuré la base de données, lancez le serveur avec :

```
npm start
```

## Installation et Lancement via Docker

Pour installer et lancer l'application en utilisant Docker, suivez les étapes ci-dessous :

1. Construisez les images Docker :

   ```
   docker-compose up --build
   ```

2. Accédez à l'API :

   ```
   http://localhost:3000/api/users
   ```

3. Arrêtez les conteneurs Docker :
   ```
   docker-compose down
   ```

## Utilisation de l'API

L'API permet les opérations suivantes :

- Inscription d'un nouvel utilisateur.
- Vérification de l'email de l'utilisateur via un token.

### Routes

#### **POST** `/api/users/signup`

Inscrit un nouvel utilisateur.

- **Corps de la demande**:
  - `firstName` - Prénom de l'utilisateur.
  - `email` - Email de l'utilisateur.

#### **POST** `/api/users/validate-email/:verificationToken`

Valide l'email de l'utilisateur.

- **Paramètres**:
  - `verificationToken` - Token de vérification envoyé par email.

## Interaction avec l'API d'Envoi de Mails

Lorsqu'un utilisateur s'inscrit, un message est envoyé à l'API d'Envoi de Mails via RabbitMQ. Cette API consommatrice envoie ensuite un email de vérification à l'utilisateur.

Pour plus d'informations sur l'API d'Envoi de Mails, consultez le [dépôt GitHub correspondant](https://github.com/Kierha/webservice_api_envoieMails).
