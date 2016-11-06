FROM node:7.0-onbuild

RUN npm run -rm prebuild:prod
RUN npm run -rm build:prod
RUN npm run -rm server:prod
