FROM node:12-stretch
WORKDIR /app
ADD . /app
RUN yarn
ENV RUUVI_PORT 52020
EXPOSE ${RUUVI_PORT}
CMD node index.js