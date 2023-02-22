FROM node:16
RUN mkdir -p /src/api
WORKDIR /src/api
COPY *.json /src/api
RUN npm install
COPY . /src/api
EXPOSE 4000
CMD [ "npm", "start" ]
