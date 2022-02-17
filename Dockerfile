FROM node:12-alpine3.13

WORKDIR /usr/src/app

RUN apk --no-cache add git

COPY package*.json ./

RUN npm install


EXPOSE 8080

COPY . .

RUN npx tsc
RUN npm run generate-docs

CMD [ "npm", "run", "start:docker:dev" ]
