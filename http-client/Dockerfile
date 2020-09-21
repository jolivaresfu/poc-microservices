FROM node:lts-alpine
WORKDIR /http-client
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]