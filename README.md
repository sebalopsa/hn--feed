# Hacker News Feed App

Example app using mongodb, nestjs and angular.

## Run with docker

This command builds server and client apps and mount a mongodb database instance.

```
docker-compose up
```

Then you can open `http://localhost:8080` to use the app.

## Get feed from API

When server starts, automatically request the last stories to hydrate the database, and after that every 1 hour.

**IMPORTANT!**

If the first load does'nt work, you can run an empty post request to trigger this job

```
curl -X POST http://localhost:3000/stories/hydrate-database
```

Then you can refresh the app page.

## Run tests

You can run unit tests and end-to-end tests with. Also, every merge to main branch trigger a CI/CD pipelines with these tests.

```
cd server
npm test
npm runt test:e2e
```

## Development

For development you can run server, client and database separately

### Server

```
cd server
npm run start:dev
```

### client

```
cd client
npm run serve
```

And you can run the database with docker from [Oficial docker](https://hub.docker.com/_/mongo)

```
 docker run --name mymongo -d -p 27017:27017 mongo:latest
```

# **Enjoy it!**
