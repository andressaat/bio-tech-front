FROM node:12.16.1-alpine As builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/bio-tech-front/ /usr/share/nginx/html

# ec2-18-218-167-211.us-east-2.compute.amazonaws.com

# docker build . -t alexnfsc175/bio-tech

