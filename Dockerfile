FROM node:20.3.1-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine as final

COPY --from=builder /app/build /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


