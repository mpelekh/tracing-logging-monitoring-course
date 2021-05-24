FROM node:14-alpine

ARG WORK_DIR=/var/www/node
RUN mkdir -p ${WORK_DIR}
COPY . ${WORK_DIR}/
WORKDIR ${WORK_DIR}

EXPOSE 8084

RUN apk update && apk upgrade && apk add --no-cache bash git
RUN npm install
RUN npm run build
RUN rm -fr node_modules
RUN rm -fr src
RUN npm install --production

ENTRYPOINT  ["npm", "run", "start:prod"]
