FROM node:20.3.1-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.3.1-alpine as final

COPY --from=builder /app/build/ .

EXPOSE 3000

CMD [ "npm", "start" ]


