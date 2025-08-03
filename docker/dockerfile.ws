FROM oven/bun:1

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /user/src/app

COPY ./package.json ./package.json
COPY ./packages ./packages

COPY ./bun.lock ./bun.lock
COPY ./turbo.json ./turbo.json

COPY ./apps/websocket ./apps/websocket

RUN bun  install
RUN apt-get update && apt-get install -y openssl
RUN bun run  db:generate

EXPOSE 8081

CMD ["bun","run", "start:websocket"]
