FROM node:16
RUN mkdir -p /src/api
WORKDIR /src/api
COPY *.json /src/api
RUN npm install
COPY . /src/api
EXPOSE 3000
CMD [ "npm", "init" ]
