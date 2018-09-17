FROM node:8.6-alpine
 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
 
COPY package.json ./
RUN npm install
 
COPY . .
 
EXPOSE 3000 80
CMD ["npm", "start"],