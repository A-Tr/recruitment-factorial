# Transpile Typescript Stage
FROM node:18-alpine AS transpiler

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY scripts ./scripts

RUN npm install typescript@$(node -pe "require('./package').devDependencies.typescript")
RUN npm run build

# Build Stage
FROM node:18-alpine as builder
WORKDIR /usr/app

COPY --from=transpiler /usr/app/package*.json .
RUN npm install --omit=dev

# Run Server Stage
FROM node:18-alpine
WORKDIR /usr/app

COPY --from=transpiler /usr/app/build ./build
COPY --from=transpiler /usr/app/api ./api
COPY --from=transpiler /usr/app/package*.json .
COPY --from=builder /usr/app/node_modules ./node_modules

ENV NODE_ENV production
CMD ["node", "./build/index.js"]
