FROM node:18-alpine as base

WORKDIR /src
COPY package*.json /
COPY tsconfig.json /
EXPOSE 3001
COPY . .

FROM base as production
ENV NODE_ENV=production
ENV PORT=3001
ENV REDIS_URL=redis://:a2c74a7c5715448cb7fb7612af38a34b@apn1-supreme-grub-33516.upstash.io:33516
ENV DATABASE_URL=postgres://sfleyywetapbsy:dab4b94e704b18492fb52c6142340036bb27fec0cd540f25fb3626205b8e512a@ec2-52-205-61-230.compute-1.amazonaws.com:5432/d9j40g56isn3q4
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt
RUN npm run build
COPY . /
CMD ["node", "dist"]