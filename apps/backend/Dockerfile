FROM node:22-bookworm-slim

RUN apt-get -y update && apt-get -y install curl

WORKDIR /fullstackTest

COPY package.json yarn.lock ./
COPY apps/backend/package.json ./apps/backend/
RUN yarn install

COPY apps/backend ./apps/backend

WORKDIR /fullstackTest/apps/backend

RUN yarn build