FROM node:17

WORKDIR /wanted/
COPY ./package.json /wanted/
COPY ./yarn.lock /wanted/
COPY ./env/* /wanted/
RUN yarn install

COPY . /wanted/
CMD yarn start:dev