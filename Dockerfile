FROM node:12-buster

RUN apt-get update && \
    apt-get install -y libudev-dev libusb-1.0-0-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
ADD . /app
RUN yarn
ENV RUUVI_PORT 52020
EXPOSE ${RUUVI_PORT}
CMD node index.js