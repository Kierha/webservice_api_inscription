# Utilisation de l'image officielle Node.js comme base
FROM node:16

# Définition du répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances du projet
RUN npm install

# Copie des fichiers du projet dans le conteneur
COPY . .

# Exposition du port 3000
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
