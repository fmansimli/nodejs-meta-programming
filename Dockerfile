FROM node:18-alpine as builder
WORKDIR /temp-app

COPY package*.json ./
RUN npm install

COPY ./ ./

RUN npm run build

FROM node:18-alpine

COPY --from=builder /temp/dist /my-app/dist/
COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 4005
CMD ["npm","start"]

