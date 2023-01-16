# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /frontend
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --legacy-peer-deps
# COPY . .
# EXPOSE 3007
# RUN chown -R node /frontend
# USER node
# CMD ["npm", "start"]
# # syntax=docker/dockerfile:1.4

# FROM node:lts AS development

# ENV CI=true
# ENV PORT=3000

# WORKDIR /code
# COPY package.json /code/package.json
# COPY package-lock.json /code/package-lock.json
# RUN npm ci --legacy-peer-deps
# COPY . /code

# CMD [ "npm", "start" ]

# # FROM development AS builder

# # RUN npm run build

# # FROM development as dev-envs
# # RUN <<EOF
# # apt-get update
# # apt-get install -y --no-install-recommends git
# # EOF

# # RUN <<EOF
# # useradd -s /bin/bash -m vscode
# # groupadd docker
# # usermod -aG docker vscode
# # EOF
# # install Docker tools (cli, buildx, compose)
# # COPY --from=gloursdocker/docker / /
# # CMD [ "npm", "start" ]

# # FROM nginx:1.13-alpine

# # COPY --from=builder /code/build /usr/share/nginx/html
# Stage 1
# FROM node:14 as build-stage

# WORKDIR /frontend
# COPY package.json .
# RUN npm install --legacy-peer-deps
# COPY . .

# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# RUN npm run build

# # Stage 2
# FROM nginx:1.17.0-alpine

# COPY --from=build-stage /frontend/build /usr/share/nginx/html
# EXPOSE $REACT_DOCKER_PORT

# CMD nginx -g 'daemon off;'
# syntax=docker/dockerfile:1.4

# 1. For build React frontend
FROM node:16.8 AS development

# Set working directory
WORKDIR /frontend

# 
COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json

# Same as npm install
RUN npm i   --force

COPY . /frontend 

ENV CI=true
ENV PORT=8888
EXPOSE 80

CMD [ "npm", "start" ]

FROM development AS build

RUN npm run build


FROM development as dev-envs
# RUN <<EOF
# apt-get update
# apt-get install -y --no-install-recommends git
# EOF

# RUN <<EOF
# useradd -s /bin/bash -m vscode
# groupadd docker
# usermod -aG docker vscode
# EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]

# 2. For Nginx setup
FROM nginx:latest

# Copy config nginx
COPY --from=build /frontend/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

# Copy static assets from builder stage
COPY --from=build /frontend/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]