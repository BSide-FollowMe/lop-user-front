FROM node:14.17.3 as build

RUN mkdir /usr/src/lop-user-frontend

WORKDIR /usr/src/lop-user-frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx as production

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4000

COPY --from=build /usr/src/lop-user-frontend/dist /usr/share/nginx/html