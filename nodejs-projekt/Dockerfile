# Node.js Basis-Image (klein & schnell)
FROM node:24-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Zuerst nur package.json & package-lock.json kopieren
# (Caching-Vorteil: npm install läuft nur bei Änderungen)
COPY package*.json ./

# Installieren der Dependencies
RUN npm ci

# Danach restlichen Code kopieren
COPY . .

# Port bekannt machen
EXPOSE 3000

# Startkommando
CMD ["node", "index.js"]
