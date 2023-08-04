FROM node:18-alpine3.16

RUN npm install -g pnpm@7.17.0
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install dependencies based on the preferred package manager
COPY . .

RUN pnpm install 
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm","run", "start"]
