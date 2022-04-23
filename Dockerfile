FROM node:14-alpine as debug

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .

CMD [ "npm", "start" ]

FROM node:14-alpine as prod

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .

CMD [ "npm", "start" ]

