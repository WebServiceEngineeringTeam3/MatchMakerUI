FROM node:alpine AS staging
WORKDIR /app
COPY package*.json /app/
RUN yarn
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=staging /app/build/ /usr/share/nginx/html