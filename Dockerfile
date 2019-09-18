# Pull base image.
FROM node:alpine

# Set Work Dir
WORKDIR /app

# Copy files to install
ADD ./src/ /app/src/
ADD ./data/ /app/data/
ADD ./docs/ /app/docs/
ADD ./test/ /app/test/
ADD ./.env /app
ADD ./.babelrc /app
ADD ./.env.example /app
ADD ./.yo-rc.json /app
ADD ./package.json /app
ADD ./package-lock.json /app

#Install node modules
RUN cd /app && \
    npm install

# Expose ports
EXPOSE 9000

#Run on build
CMD [ "npm", "start" ]