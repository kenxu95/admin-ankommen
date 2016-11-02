FROM node:7.0-onbuild

RUN npm run prebuild:prod
RUN npm run build:prod
RUN npm run server:prod
