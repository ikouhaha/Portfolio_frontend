FROM node:14-alpine as development

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . .
ENV F_V="./frontend:"

CMD [ "npm", "start" ]

FROM node:14-alpine as production

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build for production.
ENV REACT_APP_BASE_URL="https://vt6003cem-portfolio-api.azurewebsites.net"
ENV F_V=""
RUN npm run build 

# Install `serve` to run the application.
RUN npm install -g serve

CMD serve -s build

