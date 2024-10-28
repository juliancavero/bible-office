# Dockerfile para bib-office
FROM node:18

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Instalar dependencias de desarrollo como vite
# RUN npm install -g vite

# Copiar el resto del código
COPY . .

# Exponer el puerto de desarrollo de Vite
EXPOSE 3100

# Comando por defecto
CMD ["npm", "run", "dev"]
