FROM node:22-bookworm-slim

RUN apt-get -y update && apt-get -y install curl

WORKDIR /fullstackTest

COPY package.json yarn.lock ./
COPY apps/frontend/package.json ./apps/frontend/
RUN yarn install

COPY apps/frontend ./apps/frontend

WORKDIR /fullstackTest/apps/frontend

RUN yarn build
