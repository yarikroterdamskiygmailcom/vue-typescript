# build node
FROM node:lts-alpine as vue-node
RUN npm install -g yarn
COPY . /app
WORKDIR /app
RUN yarn install
RUN yarn build

# build nginx
FROM nginx:stable
RUN mkdir /usr/share/nginx/html/charttool
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=vue-node /app/dist /usr/share/nginx/html
EXPOSE 80
