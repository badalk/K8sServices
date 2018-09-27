FROM node:8.6-alpine
 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
 
COPY package.json ./
RUN npm install
 
COPY . .

ENV PORT 80 

CMD ["npm", "start"],