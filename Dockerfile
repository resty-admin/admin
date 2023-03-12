FROM node:16 AS builder
ENV TZ=Europe/Kiev
WORKDIR /home
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn run build:prod

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /home/dist/admin/browser .