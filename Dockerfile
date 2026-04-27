FROM node:24

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

RUN npx playwright install --with-deps

COPY . .

# CMD ["npm", "test"]