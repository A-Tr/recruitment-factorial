## Build Stage
FROM node:16-alpine AS builder

ENV NODE_ENV production
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL ${REACT_APP_API_BASE_URL}

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --omit=dev

COPY . .
CMD npm run build

## Serve Stage
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
