FROM node:12.7-alpine AS build
WORKDIR /home/simplewebsite/BouwDataWebApp
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /home/simplewebsite/BouwDataWebApp/dist/BouwDataWebApp /usr/share/nginx/html
