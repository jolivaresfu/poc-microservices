FROM node:lts-alpine
WORKDIR /microservice
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]