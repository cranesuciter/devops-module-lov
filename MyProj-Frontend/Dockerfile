FROM node:14
WORKDIR .
COPY package*.json ./
RUN npm install
EXPOSE 8080
COPY . .
CMD ["npm", "start"]