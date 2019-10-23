FROM node:10
RUN mkdir app
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
